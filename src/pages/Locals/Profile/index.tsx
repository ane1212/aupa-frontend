import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context';
import { localService } from '../../../services/API';
import type { Local } from '../../../services/models';
import { 
    User, Mail, BadgeCheck, FileText, Calendar, 
    ShieldAlert, Share2, HelpCircle, LogOut, ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAppCopy } from '../../../i18n/copy';

const LocalProfile: React.FC = () => {
    const { logout, user } = useAuth();
    const t = getAppCopy(user?.language).localDash;
    const navigate = useNavigate();
    const [local, setLocal] = useState<Local | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocal = async () => {
            try {
                const data = await localService.getMine();
                setLocal(data);
            } catch (err) {
                console.error("Error fetching profile local data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLocal();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
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
            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    backgroundColor: '#fee2e2', 
                    color: '#ef342a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    border: '2px solid #ef342a'
                }}>
                    {local?.name?.charAt(0) || user?.name?.charAt(0) || 'L'}
                </div>
                <div>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: 800 }}>{local?.name || t.yourLocal}</h2>
                    <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#15803d',
                        background: '#dcfce7',
                        padding: '2px 8px',
                        borderRadius: '9999px'
                    }}>
                        <BadgeCheck size={12} /> {t.verifiedPartner}
                    </span>
                    <p style={{ margin: '6px 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                        {local?.address || t.noAddressRegistered}
                    </p>
                </div>
            </div>

            {/* PARTNER STATUS */}
            <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {t.partnerStatus}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <BadgeCheck size={18} color="#16a34a" />
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.businessVerified}</div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.businessVerifiedDesc}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FileText size={18} color="#ef342a" />
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.activePosts}</div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.activePostsDesc}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Calendar size={18} color="#2563eb" />
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.partnerSince}</div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.memberSince}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ACCOUNT SECTIONS */}
            <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {t.accountAndBusiness}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }} onClick={() => alert(t.ownerInfo)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <User size={18} color="#64748b" />
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.ownerInfo}</div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.ownerInfoDesc}</div>
                            </div>
                        </div>
                        <ChevronRight size={16} color="#94a3b8" />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }} onClick={() => alert(t.contactInfo)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Mail size={18} color="#64748b" />
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.contactInfo}</div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.emailLabel}: {user?.email}</div>
                            </div>
                        </div>
                        <ChevronRight size={16} color="#94a3b8" />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }} onClick={() => alert(t.manageVerification)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ShieldAlert size={18} color="#64748b" />
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.manageVerification}</div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.manageVerificationDesc}</div>
                            </div>
                        </div>
                        <ChevronRight size={16} color="#94a3b8" />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', cursor: 'pointer' }} onClick={() => alert(t.socialMedia)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Share2 size={18} color="#64748b" />
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.socialMedia}</div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.socialMediaDesc}</div>
                            </div>
                        </div>
                        <ChevronRight size={16} color="#94a3b8" />
                    </div>
                </div>
            </div>

            {/* AUPA INFO */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Aupa
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <HelpCircle size={18} color="#64748b" />
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.helpCenter}</span>
                        </div>
                        <ChevronRight size={16} color="#94a3b8" />
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', cursor: 'pointer' }} onClick={handleLogout}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <LogOut size={18} color="#dc2626" />
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#dc2626' }}>{t.logout}</span>
                        </div>
                        <ChevronRight size={16} color="#dc2626" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocalProfile;
