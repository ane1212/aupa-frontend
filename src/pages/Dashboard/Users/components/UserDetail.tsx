import { DashboardDetail } from '../../../../components/common'
import type { User } from '../../../../services/models'

interface Props {
    user: User
    onClose: () => void
}

const UserDetail = ({ user, onClose }: Props) => (
    <DashboardDetail
        title={user.name}
        subtitle={user.email}
        fields={[
            { label: 'ID', value: user.id },
            { label: 'Nombre', value: user.name },
            { label: 'Email', value: user.email },
            { label: 'Rol', value: user.role === 'superAdmin' ? 'Admin' : user.role === 'local' ? 'Local' : 'User' },
            { label: 'Estado', value: user.active ? 'Activo' : 'Inactivo' },
            { label: 'Avatar', value: user.avatar ?? '—' },
            { label: 'Registro', value: user.createdAt ?? '—' },
            { label: 'Actualizado', value: user.updatedAt ?? '—' },
        ]}
        onClose={onClose}
    />
)

export default UserDetail
