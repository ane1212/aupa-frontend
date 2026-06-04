import { DashboardForm } from '../../../../components/common'
import { eventService } from '../../../../services/API'

interface Props {
    onCreated: () => void
    onClose: () => void
}

const EventAddModal = ({ onCreated, onClose }: Props) => (
    <DashboardForm
        title="Añadir Evento"
        fields={[
            { key: 'title', label: 'Título', type: 'text', required: true },
            { key: 'description', label: 'Descripción', type: 'text', required: false },
            { key: 'date', label: 'Fecha (YYYY-MM-DD)', type: 'text', required: true },
            { key: 'startTime', label: 'Hora inicio (HH:MM)', type: 'text', required: true },
            { key: 'endTime', label: 'Hora fin (HH:MM)', type: 'text', required: false },
            { key: 'price', label: 'Precio', type: 'text', required: false }, // En un sistema real puede ser number
            { key: 'capacity', label: 'Capacidad', type: 'text', required: false },
            { key: 'address', label: 'Dirección', type: 'text', required: false },
            { key: 'localId', label: 'Local ID', type: 'text', required: true },
            { key: 'categoryId', label: 'Categoría ID', type: 'text', required: false },
            { key: 'image', label: 'URL Imagen', type: 'text', required: false },
        ]}
        onSubmit={async (data) => {
            // Conversiones necesarias
            const payload = {
                ...data,
                price: data.price ? Number(data.price) : 0,
                capacity: data.capacity ? Number(data.capacity) : undefined
            }
            await eventService.create(payload as any)
            onCreated()
        }}
        onClose={onClose}
    />
)

export default EventAddModal
