import { DashboardForm } from '../../../../components/common'
import { userService } from '../../../../services/API'
import type { User, UserRole } from '../../../../services/models'

interface Props {
    user: User
    onUpdated: (updated: User) => void
    onClose: () => void
}

const UserEditModal = ({ user, onUpdated, onClose }: Props) => (
    <DashboardForm
        title="Editar Usuario"
        initialValues={{ role: user.role, active: user.active ? 'true' : 'false' }}
        fields={[
            {
                key: 'role', label: 'Rol', type: 'select', required: true, options: [
                    { label: 'Usuario', value: 'usuario' },
                    { label: 'Local', value: 'local' },
                    { label: 'Admin', value: 'superAdmin' },
                ]
            },
            {
                key: 'active', label: 'Estado', type: 'select', required: true, options: [
                    { label: 'Activo', value: 'true' },
                    { label: 'Inactivo', value: 'false' },
                ]
            },
        ]}
        onSubmit={async (data) => {
            if (data.role !== user.role)
                await userService.updateRole(user.id, data.role)
            if (data.active !== String(user.active))
                await userService.toggleActive(user.id)
            onUpdated({ ...user, role: data.role as UserRole, active: data.active === 'true' })
        }}
        onClose={onClose}
    />
)

export default UserEditModal
