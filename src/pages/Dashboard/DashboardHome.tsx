import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Users, Store, CalendarDays, Tags, SlidersHorizontal,
    Clock, CheckCircle, ArrowRight,
    Activity
} from "lucide-react";
import { userService, localService, eventService, categoryService } from "../../services/API";
import type { User, Local } from "../../services/models";

interface Stats {
    users: number
    locals: number
    localsPending: number
    events: number
    categories: number
}

const DashboardHome = () => {
    const navigate = useNavigate()
    const [stats, setStats] = useState<Stats>({ users: 0, locals: 0, localsPending: 0, events: 0, categories: 0 })
    const [recentUsers, setRecentUsers] = useState<User[]>([])
    const [pendingLocals, setPendingLocals] = useState<Local[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            userService.getAllUsers({ page: 1, limit: 5 }),
            localService.getAll({ page: 1, limit: 5 }),
            localService.getAll({ page: 1, limit: 5, status: 'pendiente' } as any),
            eventService.getAll({ page: 1, limit: 1 }),
            categoryService.getAll({ page: 1, limit: 1 }),
        ]).then(([usersRes, localsRes, pendingRes, eventsRes, catsRes]) => {
            const extract = (res: any) =>
                Array.isArray(res) ? res
                : Array.isArray(res?.data) ? res.data
                : Array.isArray(res?.data?.data) ? res.data.data
                : []

            const total = (res: any) =>
                res?.meta?.total ?? res?.data?.meta?.total ?? extract(res).length

            setStats({
                users: total(usersRes),
                locals: total(localsRes),
                localsPending: total(pendingRes),
                events: total(eventsRes),
                categories: total(catsRes),
            })
            setRecentUsers(extract(usersRes).slice(0, 5))
            setPendingLocals(extract(pendingRes).slice(0, 5))
        }).catch(console.error)
          .finally(() => setLoading(false))
    }, [])

    const quickLinks = [
        { label: "Usuarios", icon: Users, to: "/dashboard/users", color: "#2563eb", bg: "#eff6ff" },
        { label: "Locales", icon: Store, to: "/dashboard/locals", color: "#16a34a", bg: "#f0fdf4" },
        { label: "Eventos", icon: CalendarDays, to: "/dashboard/events", color: "#d97706", bg: "#fffbeb" },
        { label: "Categorías", icon: Tags, to: "/dashboard/categories", color: "#7c3aed", bg: "#f5f3ff" },
        { label: "Preferencias", icon: SlidersHorizontal, to: "/dashboard/preferences", color: "#db2777", bg: "#fdf2f8" },
    ]

    return (
        <section className="dashboard-page">
            {/* Header */}
            <header className="dashboard-page-header">
                <div>
                    <h1>Panel de Control</h1>
                    <p>Resumen general de la plataforma Aupa.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#667085', fontSize: '0.82rem' }}>
                    <Activity size={16} />
                    <span>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </header>

            {/* Stats */}
            <div className="dashboard-stats-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-blue"><Users size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{loading ? '—' : stats.users}</strong>
                        <span className="dashboard-stat-label">Usuarios registrados</span>
                    </div>
                </div>
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-green"><Store size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{loading ? '—' : stats.locals}</strong>
                        <span className="dashboard-stat-label">Locales totales</span>
                    </div>
                </div>
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-yellow"><CalendarDays size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{loading ? '—' : stats.events}</strong>
                        <span className="dashboard-stat-label">Eventos activos</span>
                    </div>
                </div>
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}><Tags size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{loading ? '—' : stats.categories}</strong>
                        <span className="dashboard-stat-label">Categorías</span>
                    </div>
                </div>
            </div>

            {/* Quick access */}
            <div style={{ background: 'white', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(156,146,146,0.12)', boxShadow: '0 2px 12px rgba(16,24,40,0.04)' }}>
                <h2 style={{ margin: '0 0 1.1rem', fontSize: '0.95rem', color: '#111827', fontWeight: 700 }}>Accesos rápidos</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.85rem' }}>
                    {quickLinks.map(link => (
                        <button
                            key={link.to}
                            type="button"
                            onClick={() => navigate(link.to)}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
                                padding: '1.1rem 0.5rem', borderRadius: '12px', border: `1px solid ${link.bg}`,
                                background: link.bg, cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${link.color}22` }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                        >
                            <link.icon size={22} color={link.color} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: link.color }}>{link.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent activity */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

                {/* Recent users */}
                <div style={{ background: 'white', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(156,146,146,0.12)', boxShadow: '0 2px 12px rgba(16,24,40,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
                        <h2 style={{ margin: 0, fontSize: '0.95rem', color: '#111827', fontWeight: 700 }}>
                            <Clock size={15} style={{ marginRight: '6px', verticalAlign: 'middle', color: '#667085' }} />
                            Últimos usuarios
                        </h2>
                        <button type="button" onClick={() => navigate('/dashboard/users')} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            Ver todos <ArrowRight size={12} />
                        </button>
                    </div>
                    {loading ? (
                        <p style={{ color: '#98a2b3', fontSize: '0.82rem', margin: 0 }}>Cargando...</p>
                    ) : recentUsers.length === 0 ? (
                        <p style={{ color: '#98a2b3', fontSize: '0.82rem', margin: 0 }}>No hay usuarios.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {recentUsers.map(u => (
                                <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    {u.avatar
                                        ? <img src={u.avatar} alt={u.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                                        : <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e7efe9', display: 'grid', placeItems: 'center', color: '#647067', fontWeight: 700, fontSize: '0.82rem', flexShrink: 0 }}>{u.name.charAt(0).toUpperCase()}</div>
                                    }
                                    <div style={{ minWidth: 0 }}>
                                        <strong style={{ display: 'block', fontSize: '0.83rem', color: '#344054', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</strong>
                                        <span style={{ fontSize: '0.72rem', color: '#98a2b3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{u.email}</span>
                                    </div>
                                    <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: u.active ? '#f0fdf4' : '#f9fafb', color: u.active ? '#16a34a' : '#98a2b3' }}>
                                        {u.active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pending locals */}
                <div style={{ background: 'white', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(156,146,146,0.12)', boxShadow: '0 2px 12px rgba(16,24,40,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
                        <h2 style={{ margin: 0, fontSize: '0.95rem', color: '#111827', fontWeight: 700 }}>
                            <CheckCircle size={15} style={{ marginRight: '6px', verticalAlign: 'middle', color: '#667085' }} />
                            Locales por verificar
                        </h2>
                        <button type="button" onClick={() => navigate('/dashboard/locals')} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            Ver todos <ArrowRight size={12} />
                        </button>
                    </div>
                    {loading ? (
                        <p style={{ color: '#98a2b3', fontSize: '0.82rem', margin: 0 }}>Cargando...</p>
                    ) : pendingLocals.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem 0' }}>
                            <CheckCircle size={28} color="#16a34a" />
                            <p style={{ color: '#16a34a', fontSize: '0.82rem', margin: 0, fontWeight: 600 }}>¡Todo al día! No hay locales pendientes.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {pendingLocals.map(l => (
                                <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    {l.image
                                        ? <img src={l.image} alt={l.name} style={{ width: 32, height: 32, borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                                        : <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#f0fdf4', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Store size={16} color="#16a34a" /></div>
                                    }
                                    <div style={{ minWidth: 0 }}>
                                        <strong style={{ display: 'block', fontSize: '0.83rem', color: '#344054', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</strong>
                                        <span style={{ fontSize: '0.72rem', color: '#98a2b3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{l.address}</span>
                                    </div>
                                    <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: '#fffbeb', color: '#d97706' }}>
                                        Pendiente
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}

export default DashboardHome
