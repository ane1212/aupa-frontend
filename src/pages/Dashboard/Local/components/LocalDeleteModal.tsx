import { DashboardConfirm } from '../../../../components/common'
import { localService } from '../../../../services/API'
import type { Local } from '../../../../services/models'

interface Props {
    local: Local
    onDeleted: (id: string) => void
    onClose: () => void
}

const LocalDeleteModal = ({ local, onDeleted, onClose }: Props) => (
    <DashboardConfirm
        title="Eliminar Local"
        description={`¿Seguro que quieres eliminar el local "${local.name}"? Esta acción no se puede deshacer.`}
        onConfirm={async () => {
            await localService.delete(local.id)
            onDeleted(local.id)
        }}
        onClose={onClose}
    />
)

export default LocalDeleteModal
