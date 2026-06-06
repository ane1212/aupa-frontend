import React, { useState } from 'react';
import { Plus, Check, X, Users, MapPin } from 'lucide-react';
import CreateExperienceForm from './components/CreateExperienceForm';

export interface Experience {
    id: string;
    title: string;
    stops: number;
    partners: number;
    status: 'Approved' | 'Under Review' | 'Draft';
    isLive?: boolean;
}

interface Invitation {
    id: string;
    title: string;
    organizer: string;
    stops: number;
    partners: number;
    date: string;
}

const LocalExperiences: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'my' | 'invitations'>('my');
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [experiences, setExperiences] = useState<Experience[]>([
        { id: '1', title: 'Pinto Crawl', stops: 3, partners: 2, status: 'Approved', isLive: true },
        { id: '2', title: 'Sunday Vermouth Crawl', stops: 2, partners: 2, status: 'Under Review' },
        { id: '3', title: 'Rainy Day Plan', stops: 1, partners: 1, status: 'Draft' }
    ]);

    const [invitations, setInvitations] = useState<Invitation[]>([
        { id: 'inv-1', title: 'Hidden Bilbao Walks', organizer: 'Bar Toki', stops: 3, partners: 3, date: '15 May, 2026' },
        { id: 'inv-2', title: 'Old Town Pintxo Tour', organizer: 'Lurra', stops: 3, partners: 3, date: '16 May, 2026' }
    ]);

    const handleAcceptInvitation = (id: string) => {
        setInvitations(prev => prev.filter(inv => inv.id !== id));
        alert('Invitación aceptada. Ahora eres parte de esta experiencia.');
    };

    const handleDeclineInvitation = (id: string) => {
        setInvitations(prev => prev.filter(inv => inv.id !== id));
    };

    const handleSaveExperience = (newExp: Omit<Experience, 'id'>) => {
        const experienceWithId: Experience = {
            ...newExp,
            id: `exp-${Date.now()}`
        };
        setExperiences(prev => [experienceWithId, ...prev]);
        setIsCreating(false);
    };

    if (isCreating) {
        return (
            <CreateExperienceForm 
                onSave={handleSaveExperience} 
                onCancel={() => setIsCreating(false)} 
            />
        );
    }

    return (
        <div className="local-page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Experiencias</h1>
                {activeTab === 'my' && (
                    <button 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '6px',
                            background: 'var(--color-G, #22c55e)',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                        }}
                        onClick={() => setIsCreating(true)}
                    >
                        <Plus size={16} />
                        <span>Crear Experiencia</span>
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <button 
                    onClick={() => setActiveTab('my')}
                    style={{
                        flex: 1,
                        padding: '12px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'my' ? '2px solid #ef342a' : '2px solid transparent',
                        color: activeTab === 'my' ? '#ef342a' : '#64748b',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        marginBottom: '-2px'
                    }}
                >
                    Mis Experiencias ({experiences.length})
                </button>
                <button 
                    onClick={() => setActiveTab('invitations')}
                    style={{
                        flex: 1,
                        padding: '12px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'invitations' ? '2px solid #ef342a' : '2px solid transparent',
                        color: activeTab === 'invitations' ? '#ef342a' : '#64748b',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        marginBottom: '-2px'
                    }}
                >
                    Invitaciones ({invitations.length})
                </button>
            </div>

            {activeTab === 'my' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {experiences.map(exp => (
                        <div key={exp.id} style={{ background: 'white', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 700 }}>{exp.title}</h3>
                                <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#64748b' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <MapPin size={12} /> {exp.stops} paradas
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Users size={12} /> {exp.partners} socios
                                    </span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                                <span style={{ 
                                    fontSize: '0.65rem', 
                                    fontWeight: 700, 
                                    padding: '2px 8px', 
                                    borderRadius: '9999px',
                                    background: exp.status === 'Approved' ? '#dcfce7' : exp.status === 'Under Review' ? '#fef3c7' : '#f1f5f9',
                                    color: exp.status === 'Approved' ? '#15803d' : exp.status === 'Under Review' ? '#d97706' : '#64748b'
                                }}>
                                    {exp.status === 'Approved' ? 'Aprobada' : exp.status === 'Under Review' ? 'En Revisión' : 'Borrador'}
                                </span>
                                {exp.isLive && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#16a34a', fontWeight: 600 }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }}></span>
                                        En Vivo
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {invitations.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                            No tienes invitaciones pendientes.
                        </div>
                    ) : (
                        invitations.map(inv => (
                            <div key={inv.id} style={{ background: 'white', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700 }}>{inv.title}</h3>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                                            Organizado por <span style={{ fontWeight: 600, color: '#0f172a' }}>{inv.organizer}</span>
                                        </p>
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Invitado el {inv.date}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>
                                    <span>{inv.stops} paradas</span>
                                    <span>{inv.partners} socios</span>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        onClick={() => handleAcceptInvitation(inv.id)}
                                        style={{ 
                                            flex: 1, 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            gap: '4px',
                                            background: '#16a34a',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Check size={14} />
                                        Aceptar
                                    </button>
                                    <button 
                                        onClick={() => handleDeclineInvitation(inv.id)}
                                        style={{ 
                                            flex: 1, 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            gap: '4px',
                                            background: '#f1f5f9',
                                            color: '#64748b',
                                            border: 'none',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <X size={14} />
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default LocalExperiences;
