import { useEffect, useState } from 'react'
import { DashboardDetail } from '../../../../components/common'
import { localService } from '../../../../services/API'
import type { Local } from '../../../../services/models'

interface Props {
    local: Local
    onClose: () => void
}

const LocalDetail = ({ local: initialLocal, onClose }: Props) => {
    const [local, setLocal] = useState<Local>(initialLocal)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        localService.getById(initialLocal.id)
            .then(res => {
                setLocal((res as any).data || res)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [initialLocal.id])

    return (
    <DashboardDetail
        title={local.name + (loading ? ' (Cargando...)' : '')}
        subtitle={local.address}
        fields={[
            { label: 'ID', value: local.id },
            { label: 'Nombre', value: local.name },
            { label: 'Dirección', value: local.address },
            { label: 'Descripción', value: local.description || '—' },
            { label: 'Imagen', value: local.image ? <img src={local.image} alt="Local" style={{ maxWidth: '100%', borderRadius: '8px', maxHeight: '200px', objectFit: 'cover' }} /> : '—' },
            { label: 'Teléfono', value: local.phone || '—' },
            { label: 'Usuario ID', value: local.userId },
            { label: 'Estado', value: local.status.charAt(0).toUpperCase() + local.status.slice(1) },
            { label: 'Razón de rechazo', value: local.reason || '—' },
            { label: 'Verificado Por', value: local.verifiedBy || '—' },
            { label: 'Fecha Verificación', value: local.verifiedAt || '—' },
            { label: 'Registro', value: local.createdAt || '—' },
            { label: 'Actualizado', value: local.updatedAt || '—' },
        ]}
        onClose={onClose}
    />
    )
}

export default LocalDetail
