import React, { useState, useEffect } from 'react';
import { localService, eventService, categoryService } from '../../../services/API';
import type { Local, CreateEventForm, Category } from '../../../services/models';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, Euro, MapPin, Tag, Users } from 'lucide-react';
import { useAuth } from '../../../context';
import { getAppCopy } from '../../../i18n/copy';

const LocalCreateEvent: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const t = getAppCopy(user?.language).localDash;
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const [local, setLocal] = useState<Local | null>(null);
    const [loadingLocal, setLoadingLocal] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    const [form, setForm] = useState<Omit<CreateEventForm, 'localId'>>({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        image: '',
        price: 0,
        capacity: 10,
        address: '',
        categoryId: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchLocalAndEvent = async () => {
            try {
                const [myLocal, catsRes] = await Promise.all([
                    localService.getMine(),
                    categoryService.getAll({ limit: 100 }),
                ]);
                setLocal(myLocal);
                setCategories(catsRes.data ?? []);

                if (isEditMode && id) {
                    const event = await eventService.getById(id);
                    // Format date to YYYY-MM-DD
                    const formattedDate = event.date ? new Date(event.date).toISOString().split('T')[0] : '';
                    setForm({
                        title: event.title,
                        description: event.description || '',
                        date: formattedDate,
                        startTime: event.startTime ? event.startTime.substring(0, 5) : '',
                        endTime: event.endTime ? event.endTime.substring(0, 5) : '',
                        image: event.image || '',
                        price: event.price,
                        capacity: event.capacity || 10,
                        address: event.address || '',
                        categoryId: event.categoryId || '',
                    });
                } else if (myLocal && myLocal.address) {
                    setForm(prev => ({ ...prev, address: myLocal.address }));
                }
            } catch (err) {
                console.error("Error fetching local/event data:", err);
            } finally {
                setLoadingLocal(false);
            }
        };
        fetchLocalAndEvent();
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'capacity' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!local) {
            setMessage({ type: 'error', text: t.errNoLocal });
            return;
        }

        try {
            setSubmitting(true);
            setMessage(null);

            // Clean empty strings for optional fields so Sequelize doesn't crash on invalid input formats
            const cleanForm = { ...form };
            if (cleanForm.endTime === '') delete cleanForm.endTime;
            if (cleanForm.image === '') delete cleanForm.image;
            if (cleanForm.description === '') delete cleanForm.description;
            if (cleanForm.address === '') delete cleanForm.address;
            if (cleanForm.categoryId === '') delete cleanForm.categoryId;

            if (isEditMode && id) {
                // Connect to the PUT /event/:id endpoint in backend
                await eventService.update(id, cleanForm);
                setMessage({ type: 'success', text: t.eventUpdated });
            } else {
                // POST /event
                const eventData: CreateEventForm = {
                    ...cleanForm,
                    localId: local.id
                };
                await eventService.create(eventData);
                setMessage({ type: 'success', text: t.eventCreated });
            }

            setTimeout(() => {
                navigate('/local/listing');
            }, 1500);
        } catch (err) {
            console.error("Error saving event:", err);
            setMessage({ type: 'error', text: t.errSaveEvent });
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingLocal) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="local-page-container">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>{isEditMode ? t.editEvent : t.createNewEvent}</h1>

            {message && (
                <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    marginBottom: '1.5rem',
                    background: message.type === 'success' ? '#dcfce7' : '#fee2e2',
                    color: message.type === 'success' ? '#15803d' : '#b91c1c',
                    fontSize: '0.9rem',
                    fontWeight: 500
                }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div className="local-form-group">
                    <label className="local-label">{t.fieldTitle}</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={form.title}
                        onChange={handleChange}
                        className="local-input"
                        placeholder={t.fieldTitlePlaceholder}
                    />
                </div>

                <div className="local-form-group">
                    <label className="local-label">{t.fieldDescription}</label>
                    <textarea
                        name="description"
                        rows={3}
                        value={form.description || ''}
                        onChange={handleChange}
                        className="local-textarea"
                        placeholder={t.fieldDescriptionPlaceholder}
                    />
                </div>

                <div className="local-form-group">
                    <label className="local-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Tag size={14} /> {t.fieldCategory}
                    </label>
                    <select
                        name="categoryId"
                        value={form.categoryId || ''}
                        onChange={handleChange}
                        className="local-input"
                    >
                        <option value="">{t.fieldCategoryPlaceholder}</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="local-form-group">
                        <label className="local-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={14} /> {t.fieldDate}
                        </label>
                        <input 
                            type="date" 
                            name="date" 
                            required 
                            value={form.date} 
                            onChange={handleChange} 
                            className="local-input" 
                        />
                    </div>

                    <div className="local-form-group">
                        <label className="local-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} /> {t.fieldStartTime}
                        </label>
                        <input 
                            type="time" 
                            name="startTime" 
                            required 
                            value={form.startTime} 
                            onChange={handleChange} 
                            className="local-input" 
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="local-form-group">
                        <label className="local-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Euro size={14} /> {t.fieldPrice}
                        </label>
                        <input 
                            type="number" 
                            name="price" 
                            min="0"
                            value={form.price} 
                            onChange={handleChange} 
                            className="local-input" 
                        />
                    </div>

                    <div className="local-form-group">
                        <label className="local-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Users size={14} /> {t.fieldCapacity}
                        </label>
                        <input 
                            type="number" 
                            name="capacity" 
                            min="1"
                            value={form.capacity} 
                            onChange={handleChange} 
                            className="local-input" 
                        />
                    </div>
                </div>

                <div className="local-form-group">
                    <label className="local-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} /> {t.fieldEventAddress}
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={form.address || ''}
                        onChange={handleChange}
                        className="local-input"
                        placeholder={t.fieldEventAddressPlaceholder}
                    />
                </div>

                <div className="local-form-group">
                    <label className="local-label">{t.fieldImageUrl}</label>
                    <input
                        type="text"
                        name="image"
                        value={form.image || ''}
                        onChange={handleChange}
                        className="local-input"
                        placeholder={t.fieldImageUrlPlaceholder}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={submitting} 
                    className="local-btn" 
                    style={{ marginTop: '1rem', background: 'var(--color-G, #22c55e)' }}
                >
                    {submitting ? t.saving : (isEditMode ? t.saveChanges : t.publishEvent)}
                </button>
            </form>
        </div>
    );
};

export default LocalCreateEvent;
