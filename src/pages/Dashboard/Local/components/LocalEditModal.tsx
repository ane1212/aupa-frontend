import { DashboardForm } from '../../../../components/common'
import { localService } from '../../../../services/API'
import type { Local } from '../../../../services/models'

interface Props {
    local: Local
    onUpdated: (updated: Local) => void
    onClose: () => void
}

const LocalEditModal = ({ local, onUpdated, onClose }: Props) => (
    <DashboardForm
        title="Editar Estado del Local"
        initialValues={{ status: local.status, reason: local.reason || '' }}
        fields={[
            {
                key: 'status', label: 'Estado', type: 'select', required: true, options: [
                    { label: 'Pendiente', value: 'pendiente' },
                    { label: 'Aprobado', value: 'aprobado' },
                    { label: 'Rechazado', value: 'rechazado' },
                ]
            },
            { key: 'reason', label: 'Razón (si es rechazado)', type: 'text', required: false },
        ]}
        onSubmit={async (data) => {
            if (data.status !== local.status || data.reason !== (local.reason ?? '')) {
                const updated = await localService.verify(local.id, data.status, data.reason)
                onUpdated(updated)
            }
        }}
        onClose={onClose}
    />
)

export default LocalEditModal
