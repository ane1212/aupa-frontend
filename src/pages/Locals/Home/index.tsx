import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context';
import { localService } from '../../../services/API';
import type { Local } from '../../../services/models';
import { getAppCopy } from '../../../i18n/copy';
import { Calendar, Eye, MousePointerClick, Star, MapPin } from 'lucide-react';

const LocalHome: React.FC = () => {
    const { user } = useAuth();
    const t = getAppCopy(user?.language).localDash;
    const [local, setLocal] = useState<Local | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLocalData = async () => {
            try {
                const res = await localService.getMine();
                setLocal(res);
            } catch (err) {
                console.error("Error fetching local profile info:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLocalData();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="local-page-container">
            <div className="local-home-hero">
                <span style={{ fontSize: '0.85rem', color: '#ef342a', fontWeight: 600 }}>{t.verifiedPartner}</span>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '4px 0 8px 0' }}>
                    {local?.name || user?.name || t.yourLocal}
                </h1>
                <p style={{ margin: 0, color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
                    <MapPin size={16} />
                    {local?.address || t.noAddressSpecified}
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{t.performance}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px' }}>
                    <Calendar size={14} />
                    <span>{t.last7Days}</span>
                </div>
            </div>

            <div className="local-stats-grid">
                <div className="local-stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Eye size={20} color="#64748b" />
                        <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>+4%</span>
                    </div>
                    <span className="local-stat-val">2,149</span>
                    <span className="local-stat-label">{t.statViews}</span>
                </div>

                <div className="local-stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <MousePointerClick size={20} color="#64748b" />
                        <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>+12%</span>
                    </div>
                    <span className="local-stat-val">523</span>
                    <span className="local-stat-label">{t.statClicks}</span>
                </div>

                <div className="local-stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Star size={20} color="#64748b" />
                        <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>+2%</span>
                    </div>
                    <span className="local-stat-val">178</span>
                    <span className="local-stat-label">{t.statSavedRoutes}</span>
                </div>

                <div className="local-stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Eye size={20} color="#64748b" />
                        <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600 }}>-1%</span>
                    </div>
                    <span className="local-stat-val">98</span>
                    <span className="local-stat-label">{t.statProfileVisits}</span>
                </div>
            </div>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>{t.recentActivity}</h2>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.8)', padding: '0.5rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.actNewReview}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.actReviewQuote}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.ago5h}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.actProfileUpdated}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.actHoursChanged}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.ago1d}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.actEventApproved}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.actEventVisible}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.ago2d}</span>
                </div>
            </div>
        </div>
    );
};

export default LocalHome;
