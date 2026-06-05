import { DashboardConfirm } from '../../../../components/common'
import { userService } from '../../../../services/API'
import type { User } from '../../../../services/models'

interface Props {
    user: User
    onDeleted: (id: string) => void
    onClose: () => void
}

const UserDeleteModal = ({ user, onDeleted, onClose }: Props) => (
    <DashboardConfirm
        title="Eliminar usuario"
        description={`¿Seguro que quieres eliminar a ${user.name}? Esta acción no se puede deshacer.`}
        onConfirm={async () => {
            await userService.deleteProfile()
            onDeleted(user.id)
        }}
        onClose={onClose}
    />
)

export default UserDeleteModal
