import { useEffect, useRef, useState } from 'react'
import { Bell, Check, CheckCheck, Trash2, X, Info, AlertTriangle, Monitor } from 'lucide-react'
import { notificationService } from '../../services/API'
import { useAuth } from '../../context'
import { getAppCopy } from '../../i18n/copy'
import type { Notification } from '../../services/models'


const typeIcon = (type: string) => {
    if (type === 'alerta') return <AlertTriangle size={14} color="#d97706" />
    if (type === 'sistema') return <Monitor size={14} color="#7c3aed" />
    return <Info size={14} color="#2563eb" />
}


const typeBg = (type: string) => {
    if (type === 'alerta') return '#fffbeb'
    if (type === 'sistema') return '#f5f3ff'
    return '#eff6ff'
}


const NotificationPanel = () => {
    const { user } = useAuth()
    const t = getAppCopy(user?.language).notifications
    const locale = user?.language === 'es' ? 'es-ES' : user?.language === 'eu' ? 'eu-EU' : user?.language === 'fr' ? 'fr-FR' : 'en-GB'
    const [open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)


    const unread = notifications.filter(n => !n.read).length


    const fetchNotifications = () => {
        if (!user) {
            setNotifications([])
            return
        }

        setLoading(true)
        notificationService.getAll({ page: 1, limit: 30 })
            .then(res => {
                const data: Notification[] = Array.isArray(res) ? res
                    : Array.isArray((res as any).data) ? (res as any).data
                    : Array.isArray((res as any).data?.data) ? (res as any).data.data
                    : []
                setNotifications(data)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (!user) return
        fetchNotifications()
        const interval = setInterval(fetchNotifications, 60_000)
        return () => clearInterval(interval)
    }, [user])

    useEffect(() => {
        if (!open) return
        const handler = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [open])


    const handleMarkRead = async (id: string) => {
        if (!user) return 
        await notificationService.markAsRead(id)
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    }


    const handleMarkAllRead = async () => {
        if (!user) return 
        await notificationService.markAllAsRead()
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }


    const handleDelete = async (id: string) => {
        if (!user) return 
        await notificationService.delete(id)
        setNotifications(prev => prev.filter(n => n.id !== id))
    }


    return (
        <div ref={panelRef} style={{ position: 'relative' }}>
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                style={{
                    position: 'relative', width: 38, height: 38, display: 'grid', placeItems: 'center',
                    border: '1px solid #eaecf0', borderRadius: '10px', background: open ? '#f9fafb' : 'white',
                    cursor: 'pointer', color: '#667085', transition: 'background 0.15s',
                }}
                aria-label={t.title}
            >
                <Bell size={18} />
                {unread > 0 && (
                    <span style={{
                        position: 'absolute', top: -5, right: -5,
                        minWidth: 18, height: 18, padding: '0 4px',
                        background: '#d92d20', color: 'white',
                        borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800,
                        display: 'grid', placeItems: 'center',
                        border: '2px solid white',
                    }}>
                        {unread > 99 ? '99+' : unread}
                    </span>
                )}
            </button>

            {open && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                    width: 360, maxHeight: 480,
                    background: 'white', borderRadius: '14px',
                    border: '1px solid rgba(156,146,146,0.14)',
                    boxShadow: '0 16px 48px rgba(16,24,40,0.14)',
                    zIndex: 300, display: 'flex', flexDirection: 'column',
                    animation: 'modalIn 0.18s ease',
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '1rem 1.1rem 0.75rem',
                        borderBottom: '1px solid rgba(156,146,146,0.12)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong style={{ fontSize: '0.9rem', color: '#111827' }}>{t.title}</strong>
                            {unread > 0 && (
                                <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '1px 7px', borderRadius: '999px', background: '#fee2e2', color: '#d92d20' }}>
                                    {unread} {t.unread}
                                </span>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {unread > 0 && (
                                <button
                                    type="button"
                                    title={t.markAllRead}
                                    onClick={handleMarkAllRead}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#667085', display: 'grid', placeItems: 'center', padding: '4px' }}
                                >
                                    <CheckCheck size={16} />
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#667085', display: 'grid', placeItems: 'center', padding: '4px' }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {loading ? (
                            <p style={{ textAlign: 'center', color: '#98a2b3', fontSize: '0.82rem', padding: '2rem 0' }}>{t.loading}</p>
                        ) : notifications.length === 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '2.5rem 1rem' }}>
                                <Bell size={30} color="#d0d5dd" />
                                <p style={{ margin: 0, color: '#98a2b3', fontSize: '0.82rem' }}>
                                    {user ? t.empty : t.loginToSee}
                                </p>
                            </div>
                        ) : (
                            notifications.map(n => (
                                <div
                                    key={n.id}
                                    style={{
                                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                                        padding: '0.85rem 1.1rem',
                                        borderBottom: '1px solid #f2f4f7',
                                        background: n.read ? 'white' : '#fafbff',
                                        transition: 'background 0.15s',
                                    }}
                                >

                                    <div style={{
                                        width: 30, height: 30, flexShrink: 0, borderRadius: '8px',
                                        background: typeBg(n.type), display: 'grid', placeItems: 'center', marginTop: 2,
                                    }}>
                                        {typeIcon(n.type)}
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <strong style={{ fontSize: '0.82rem', color: '#111827' }}>{n.title}</strong>
                                            {!n.read && (
                                                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563eb', flexShrink: 0, display: 'inline-block' }} />
                                            )}
                                        </div>
                                        <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#667085', lineHeight: 1.4 }}>{n.message}</p>
                                        {n.createdAt && (
                                            <span style={{ fontSize: '0.68rem', color: '#98a2b3', marginTop: 4, display: 'block' }}>
                                                {new Date(n.createdAt).toLocaleDateString(locale, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                                        {!n.read && (
                                            <button
                                                type="button"
                                                title={t.markRead}
                                                onClick={() => handleMarkRead(n.id)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#667085', display: 'grid', placeItems: 'center', padding: '3px', borderRadius: '4px' }}
                                            >
                                                <Check size={13} />
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            title={t.delete}
                                            onClick={() => handleDelete(n.id)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#98a2b3', display: 'grid', placeItems: 'center', padding: '3px', borderRadius: '4px' }}
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}


export default NotificationPanel