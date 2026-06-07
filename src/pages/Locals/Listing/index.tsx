import React, { useEffect, useState } from 'react';
import { localService, eventService } from '../../../services/API';
import type { Local, Event } from '../../../services/models';
import LocalEventCard from './components/LocalEventCard';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context';
import { getAppCopy } from '../../../i18n/copy';

const LocalListing: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const t = getAppCopy(user?.language).localDash;

    const [local, setLocal] = useState<Local | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocalAndEvents = async () => {
            try {
                setLoading(true);
                // 1. Obtener la información del local asociado al usuario logueado
                const localData = await localService.getMine();
                setLocal(localData);

                if (localData && localData.id) {
                    // 2. Obtener los eventos filtrados por el ID de este local específico
                    const eventsResponse = await eventService.getAll({ localId: localData.id });
                    
                    // El response es PaginatedResponse<Event>, los datos reales están en data
                    if (eventsResponse && eventsResponse.data) {
                        setEvents(eventsResponse.data);
                    } else {
                        setEvents([]);
                    }
                }
            } catch (err: any) {
                console.error("Error cargando eventos del local:", err);
                setError(t.errLoadingData);
                
                // Fallback / simulación con tipado correcto en caso de que no haya backend corriendo
                const mockLocalId = local?.id || "mock-local-123";
                const mockEvents: Event[] = [
                    {
                        id: "event-1",
                        title: "Pinto Crawl - Ruta de Pinchos Clásica",
                        description: "Disfruta de la mejor ruta guiada de pinchos por los locales históricos de la ciudad. Degustaciones incluidas.",
                        date: new Date().toISOString(),
                        startTime: "19:00",
                        endTime: "22:00",
                        price: 15,
                        capacity: 20,
                        address: "Casco Viejo, Bilbao",
                        localId: mockLocalId,
                        active: true,
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: "event-2",
                        title: "Domingos de Vermut & Jazz",
                        description: "Vermut preparado especial de la casa con acompañamiento de música jazz en directo en nuestra terraza.",
                        date: new Date(Date.now() + 86400000 * 2).toISOString(), // + 2 days
                        startTime: "12:30",
                        endTime: "15:30",
                        price: 8,
                        capacity: 40,
                        address: "Plaza Nueva, Bilbao",
                        localId: mockLocalId,
                        active: true,
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: "event-3",
                        title: "Cata de Cervezas Artesanales Locales",
                        description: "Cata guiada de 4 variedades de cervezas artesanales de Euskadi maridadas con raciones seleccionadas.",
                        date: new Date(Date.now() + 86400000 * 5).toISOString(), // + 5 days
                        startTime: "20:00",
                        endTime: "21:30",
                        price: 20,
                        capacity: 15,
                        address: "Gran Vía, Bilbao",
                        localId: mockLocalId,
                        active: false,
                        createdAt: new Date().toISOString()
                    }
                ];
                setEvents(mockEvents);
            } finally {
                setLoading(false);
            }
        };

        fetchLocalAndEvents();
    }, []);

    const handleToggleActive = async (eventId: string) => {
        try {
            // Llama al servicio para alternar el estado activo/inactivo del evento
            await eventService.toggleActive(eventId);
            // Actualiza localmente el estado del evento
            setEvents(prev => prev.map(e => e.id === eventId ? { ...e, active: !e.active } : e));
        } catch (err) {
            console.error("Error al cambiar estado del evento:", err);
            // Simular cambio local si falla la conexión del backend
            setEvents(prev => prev.map(e => e.id === eventId ? { ...e, active: !e.active } : e));
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="local-page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{t.myEvents}</h1>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                        {local ? t.eventsOf.replace('{name}', local.name) : t.loadingLocal}
                      </p>
                </div>
                <button 
                    onClick={() => navigate('/local/create')}
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        background: '#ef342a',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                    }}
                >
                    <Plus size={16} />
                    <span>{t.createEventBtn}</span>
                </button>
            </div>

            {error && (
                <div style={{ padding: '8px 12px', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '8px', color: '#b45309', fontSize: '0.8rem', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {events.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>{t.noEvents}</p>
                        <button
                            onClick={() => navigate('/local/create')}
                            className="local-btn"
                            style={{ maxWidth: '200px', margin: '0 auto' }}
                        >
                            {t.createFirstEvent}
                        </button>
                    </div>
                ) : (
                    events.map(event => (
                        <LocalEventCard 
                            key={event.id} 
                            event={event} 
                            onToggleActive={handleToggleActive} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default LocalListing;
