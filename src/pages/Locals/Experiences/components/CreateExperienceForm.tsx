import React, { useState } from 'react';
import { ArrowLeft, Search, Plus, Check } from 'lucide-react';
import type { Experience } from '../index';
import { useAuth } from '../../../../context';
import { getAppCopy } from '../../../../i18n/copy';

interface CreateExperienceFormProps {
    onSave: (experience: Omit<Experience, 'id'>) => void;
    onCancel: () => void;
}

const CreateExperienceForm: React.FC<CreateExperienceFormProps> = ({ onSave, onCancel }) => {
    const { user } = useAuth();
    const t = getAppCopy(user?.language).localDash;
    const [step, setStep] = useState<number>(1);
    
    // Form States
    const [type, setType] = useState<'business' | 'collaborative'>('business');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('Food & Drink');
    const [duration, setDuration] = useState<string>('2-3 hours');
    const [availability, setAvailability] = useState<string>('Every Friday');
    const [priceRange, setPriceRange] = useState<string>('20-30 EUR');
    const [language, setLanguage] = useState<string>('Spanish');
    const [searchPartner, setSearchPartner] = useState<string>('');
    const [selectedPartners, setSelectedPartners] = useState<string[]>([]);

    const suggestedPartners = [
        { id: 'p-1', name: 'El Bar Globo', type: 'Bar', city: 'Bilbao' },
        { id: 'p-2', name: 'Gure Toki', type: 'Bar', city: 'Bilbao' },
        { id: 'p-3', name: 'La Viña', type: 'Bar', city: 'Bilbao' }
    ];

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            onCancel();
        }
    };

    const togglePartner = (partnerName: string) => {
        setSelectedPartners(prev => 
            prev.includes(partnerName) 
                ? prev.filter(p => p !== partnerName) 
                : [...prev, partnerName]
        );
    };

    const handleSubmit = () => {
        onSave({
            title: title || t.newExperienceDefault,
            stops: type === 'business' ? 1 : selectedPartners.length + 1,
            partners: type === 'business' ? 1 : selectedPartners.length + 1,
            status: 'Under Review',
            isLive: false
        });
    };

    return (
        <div className="local-page-container" style={{ minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '2rem' }}>
            <div>
                {/* Header with back arrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <button 
                        onClick={handleBack}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{t.createLocalExperience}</span>
                </div>

                {/* STEP 1: What kind of experience */}
                {step === 1 && (
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t.expTypeTitle}</h2>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem' }}>{t.expTypeSubtitle}</p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div 
                                onClick={() => setType('business')}
                                style={{
                                    border: type === 'business' ? '2.5px solid var(--color-G, #22c55e)' : '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '1.25rem',
                                    cursor: 'pointer',
                                    background: type === 'business' ? '#f0fdf4' : 'white',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <h3 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 700, color: type === 'business' ? '#15803d' : '#0f172a' }}>{t.expBusinessTitle}</h3>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{t.expBusinessDesc}</p>
                            </div>

                            <div 
                                onClick={() => setType('collaborative')}
                                style={{
                                    border: type === 'collaborative' ? '2.5px solid var(--color-G, #22c55e)' : '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '1.25rem',
                                    cursor: 'pointer',
                                    background: type === 'collaborative' ? '#f0fdf4' : 'white',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <h3 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 700, color: type === 'collaborative' ? '#15803d' : '#0f172a' }}>{t.expCollabTitle}</h3>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{t.expCollabDesc}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: Title and Description */}
                {step === 2 && (
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t.expTitleStep}</h2>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem' }}>{t.expTitleSubtitle}</p>

                        <div className="local-form-group">
                            <label className="local-label">{t.expTitleLabel}</label>
                            <input
                                type="text"
                                maxLength={60}
                                placeholder={t.expTitlePlaceholder}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="local-input"
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#94a3b8', marginTop: 4 }}>
                                {title.length}/60
                            </div>
                        </div>

                        <div className="local-form-group" style={{ marginTop: '1rem' }}>
                            <label className="local-label">{t.expShortDesc}</label>
                            <textarea
                                rows={4}
                                maxLength={150}
                                placeholder={t.expDescPlaceholder}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="local-textarea"
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#94a3b8', marginTop: 4 }}>
                                {description.length}/150
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: Details */}
                {step === 3 && (
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t.expDetailsTitle}</h2>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem' }}>{t.expDetailsSubtitle}</p>

                        <div className="local-form-group">
                            <label className="local-label">{t.expCategory}</label>
                            <select 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                className="local-input"
                                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                            >
                                <option value="Food & Drink">Food & Drink</option>
                                <option value="Art & Culture">Art & Culture</option>
                                <option value="Nature & Outdoors">Nature & Outdoors</option>
                            </select>
                        </div>

                        <div className="local-form-group">
                            <label className="local-label">{t.expDuration}</label>
                            <select 
                                value={duration} 
                                onChange={(e) => setDuration(e.target.value)}
                                className="local-input"
                                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                            >
                                <option value="1-2 hours">1-2 hours</option>
                                <option value="2-3 hours">2-3 hours</option>
                                <option value="3-4 hours">3-4 hours</option>
                            </select>
                        </div>

                        <div className="local-form-group">
                            <label className="local-label">{t.expAvailability}</label>
                            <select 
                                value={availability} 
                                onChange={(e) => setAvailability(e.target.value)}
                                className="local-input"
                                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                            >
                                <option value="Every Friday">Every Friday</option>
                                <option value="Weekends">Weekends</option>
                                <option value="Daily">Daily</option>
                                <option value="On request">On request</option>
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="local-form-group">
                                <label className="local-label">{t.expPriceRange}</label>
                                <input 
                                    type="text"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="local-input"
                                    placeholder="20-30 EUR"
                                />
                            </div>

                            <div className="local-form-group">
                                <label className="local-label">{t.expLanguages}</label>
                                <select 
                                    value={language} 
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="local-input"
                                    style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                                >
                                    <option value="Spanish">Spanish</option>
                                    <option value="Basque">Basque</option>
                                    <option value="English">English</option>
                                    <option value="French">French</option>
                                </select>
                            </div>
                        </div>

                        <div className="local-form-group">
                            <label className="local-label">{t.expPhotos}</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ width: '70px', height: '70px', border: '1px solid #cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', cursor: 'pointer' }}>
                                    <Plus size={20} color="#94a3b8" />
                                </div>
                                <div style={{ width: '70px', height: '70px', border: '1px solid #cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', cursor: 'pointer' }}>
                                    <Plus size={20} color="#94a3b8" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 4: Invite partners */}
                {step === 4 && (
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t.expInviteTitle}</h2>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem' }}>{t.expInviteSubtitle}</p>
                        
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input 
                                type="text"
                                placeholder={t.expSearchPartners}
                                value={searchPartner}
                                onChange={(e) => setSearchPartner(e.target.value)}
                                className="local-input"
                                style={{ paddingLeft: '2.25rem' }}
                            />
                        </div>

                        <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>{t.expSuggestedPartners}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {suggestedPartners.map(partner => (
                                <div 
                                    key={partner.id}
                                    onClick={() => togglePartner(partner.name)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        background: 'white',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: selectedPartners.includes(partner.name) ? '2px solid var(--color-G, #22c55e)' : '1px solid #e2e8f0',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{partner.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{partner.type} · {partner.city}</div>
                                    </div>
                                    {selectedPartners.includes(partner.name) && (
                                        <Check size={18} color="#22c55e" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div style={{ marginTop: '2rem' }}>
                <button 
                    onClick={handleNext}
                    className="local-btn"
                    style={{ background: 'var(--color-G, #22c55e)', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}
                >
                    {t.continueBtn}
                </button>
                
                {step === 4 && (
                    <button 
                        onClick={handleSubmit}
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#64748b', 
                            fontSize: '0.85rem', 
                            fontWeight: 600, 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            textAlign: 'center', 
                            marginTop: '1rem' 
                        }}
                    >
                        {t.skipForNow}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CreateExperienceForm;
