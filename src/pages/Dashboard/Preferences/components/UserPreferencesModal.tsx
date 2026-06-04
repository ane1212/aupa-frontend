import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { categoryService, preferenceService } from '../../../../services/API'
import type { Category, Preference, User } from '../../../../services/models'

interface Props {
    user: User
    onClose: () => void
}

const UserPreferencesModal = ({ user, onClose }: Props) => {
    const [preferences, setPreferences] = useState<Preference[]>([])
    const [categories, setCategories] = useState<Map<string, string>>(new Map())
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        Promise.all([
            preferenceService.getByUser(user.id, { page: 1, limit: 100 }),
            categoryService.getAll({ page: 1, limit: 100 }),
        ]).then(([prefRes, catRes]) => {
            if (cancelled) return

            // Handle all possible API response shapes
            const prefData = (prefRes as any)
            const prefs: Preference[] = Array.isArray(prefData) ? prefData
                : Array.isArray(prefData?.data) ? prefData.data
                : Array.isArray(prefData?.data?.data) ? prefData.data.data
                : []

            const catData = (catRes as any)
            const cats: Category[] = Array.isArray(catData) ? catData
                : Array.isArray(catData?.data) ? catData.data
                : Array.isArray(catData?.data?.data) ? catData.data.data
                : []

            const map = new Map<string, string>()
            cats.forEach(c => map.set(c.id, c.name))

            setPreferences(prefs)
            setCategories(map)
        }).catch(console.error)
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    }, [user.id])

    return (
        <>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal" style={{ maxWidth: '560px', width: '90%' }}>
                <div className="modal-header">
                    <strong>Preferencias de {user.name}</strong>
                    <button type="button" className="modal-close" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>
                <div className="modal-body" style={{ padding: '20px' }}>
                    {loading ? (
                        <p style={{ textAlign: 'center', opacity: 0.6 }}>Cargando preferencias...</p>
                    ) : preferences.length === 0 ? (
                        <p style={{ textAlign: 'center', opacity: 0.6 }}>Este usuario no tiene preferencias.</p>
                    ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {preferences.map(pref => (
                                <span
                                    key={pref.id}
                                    style={{
                                        background: 'var(--accent-soft, rgba(99,102,241,0.15))',
                                        color: 'var(--accent, #6366f1)',
                                        borderRadius: '999px',
                                        padding: '4px 14px',
                                        fontSize: '0.82rem',
                                        fontWeight: 600,
                                        border: '1px solid var(--accent, #6366f1)',
                                    }}
                                >
                                    {categories.get(pref.categoryId) ?? pref.categoryId}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button type="button" className="modal-btn-cancel" onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserPreferencesModal
