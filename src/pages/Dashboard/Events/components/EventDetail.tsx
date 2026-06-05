import { useEffect, useState } from 'react'
import { DashboardDetail } from '../../../../components/common'
import { eventService } from '../../../../services/API'
import type { Event } from '../../../../services/models'

interface Props {
    event: Event
    onClose: () => void
}

const EventDetail = ({ event: initialEvent, onClose }: Props) => {
    const [event, setEvent] = useState<Event>(initialEvent)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        eventService.getById(initialEvent.id)
            .then(res => {
                setEvent((res as any).data || res)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [initialEvent.id])

    return (
    <DashboardDetail
        title={event.title + (loading ? ' (Cargando...)' : '')}
        subtitle={event.date + " " + event.startTime}
        fields={[
            { label: 'ID', value: event.id },
            { label: 'Título', value: event.title },
            { label: 'Descripción', value: event.description || '—' },
            { label: 'Imagen', value: event.image ? <img src={event.image} alt="Evento" style={{ maxWidth: '100%', borderRadius: '8px', maxHeight: '200px', objectFit: 'cover' }} /> : '—' },
            { label: 'Fecha', value: event.date },
            { label: 'Hora Inicio', value: event.startTime },
            { label: 'Hora Fin', value: event.endTime || '—' },
            { label: 'Precio', value: event.price !== undefined ? `€${event.price}` : '—' },
            { label: 'Capacidad', value: event.capacity !== undefined ? String(event.capacity) : '—' },
            { label: 'Dirección', value: event.address || '—' },
            { label: 'Local ID', value: event.localId },
            { label: 'Categoría ID', value: event.categoryId || '—' },
            { label: 'Estado', value: event.active ? 'Activo' : 'Inactivo' },
            { label: 'Registro', value: event.createdAt || '—' },
            { label: 'Actualizado', value: event.updatedAt || '—' },
        ]}
        onClose={onClose}
    />
    )
}

export default EventDetail
