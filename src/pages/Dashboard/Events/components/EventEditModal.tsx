import { DashboardForm } from '../../../../components/common'
import { eventService } from '../../../../services/API'
import type { Event } from '../../../../services/models'

interface Props {
    event: Event
    onUpdated: (updated: Event) => void
    onClose: () => void
}

const EventEditModal = ({ event, onUpdated, onClose }: Props) => (
    <DashboardForm
        title="Editar Evento"
        initialValues={{
            title: event.title,
            description: event.description || '',
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime || '',
            price: event.price?.toString() || '0',
            capacity: event.capacity?.toString() || '',
            address: event.address || '',
            categoryId: event.categoryId || '',
            image: event.image || '',
        }}
        fields={[
            { key: 'title', label: 'Título', type: 'text', required: true },
            { key: 'description', label: 'Descripción', type: 'text', required: false },
            { key: 'date', label: 'Fecha (YYYY-MM-DD)', type: 'text', required: true },
            { key: 'startTime', label: 'Hora inicio (HH:MM)', type: 'text', required: true },
            { key: 'endTime', label: 'Hora fin (HH:MM)', type: 'text', required: false },
            { key: 'price', label: 'Precio', type: 'text', required: false },
            { key: 'capacity', label: 'Capacidad', type: 'text', required: false },
            { key: 'address', label: 'Dirección', type: 'text', required: false },
            { key: 'categoryId', label: 'Categoría ID', type: 'text', required: false },
            { key: 'image', label: 'URL Imagen', type: 'text', required: false },
        ]}
        onSubmit={async (data) => {
            const payload = {
                ...data,
                price: data.price ? Number(data.price) : 0,
                capacity: data.capacity ? Number(data.capacity) : undefined
            }
            const res = await eventService.update(event.id, payload as any)
            onUpdated(res.data || res as any)
        }}
        onClose={onClose}
    />
)

export default EventEditModal
