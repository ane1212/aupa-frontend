import { DashboardForm } from '../../../../components/common'
import { userService } from '../../../../services/API'
import type { User } from '../../../../services/models'

interface Props {
    onCreated: (users: User[]) => void
    onClose: () => void
}

const UserAddModal = ({ onCreated, onClose }: Props) => (
    <DashboardForm
        title="Añadir Usuario"
        fields={[
            { key: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre completo', required: true },
            { key: 'email', label: 'Email', type: 'email', placeholder: 'correo@ejemplo.com', required: true },
            { key: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••', required: true },
            { key: 'passwordRepeat', label: 'Repetir contraseña', type: 'password', placeholder: '••••••••', required: true },
            {
                key: 'role', label: 'Rol', type: 'select', required: true, options: [
                    { label: 'Usuario', value: 'usuario' },
                    { label: 'Local', value: 'local' },
                    { label: 'Admin', value: 'superAdmin' },
                ]
            },
        ]}
        onSubmit={async (data) => {
            if (data.password !== data.passwordRepeat)
                throw new Error('Las contraseñas no coinciden')
            await userService.create(data)
            const updated = await userService.getAllUsers()
            onCreated(updated)
        }}
        onClose={onClose}
    />
)

export default UserAddModal
