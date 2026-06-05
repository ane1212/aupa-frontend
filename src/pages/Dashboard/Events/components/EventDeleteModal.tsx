import { DashboardConfirm } from '../../../../components/common'
import { eventService } from '../../../../services/API'
import type { Event } from '../../../../services/models'

interface Props {
    event: Event
    onDeleted: (id: string) => void
    onClose: () => void
}

const EventDeleteModal = ({ event, onDeleted, onClose }: Props) => (
    <DashboardConfirm
        title="Eliminar Evento"
        description={`¿Seguro que quieres eliminar el evento "${event.title}"? Esta acción no se puede deshacer.`}
        onConfirm={async () => {
            await eventService.delete(event.id)
            onDeleted(event.id)
        }}
        onClose={onClose}
    />
)

export default EventDeleteModal
