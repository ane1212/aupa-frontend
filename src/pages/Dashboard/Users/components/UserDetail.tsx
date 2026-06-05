import { useEffect, useState } from 'react'
import { DashboardDetail } from '../../../../components/common'
import { userService } from '../../../../services/API'
import type { User } from '../../../../services/models'

interface Props {
    user: User
    onClose: () => void
}

const UserDetail = ({ user: initialUser, onClose }: Props) => {
    const [user, setUser] = useState<User>(initialUser)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        userService.getUserById(initialUser.id)
            .then(res => {
                setUser((res as any).data || res)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [initialUser.id])

    return (
    <DashboardDetail
        title={user.name + (loading ? ' (Cargando...)' : '')}
        subtitle={user.email}
        fields={[
            { label: 'ID', value: user.id },
            { label: 'Nombre', value: user.name },
            { label: 'Email', value: user.email },
            { label: 'Rol', value: user.role === 'superAdmin' ? 'Admin' : user.role === 'local' ? 'Local' : 'User' },
            { label: 'Estado', value: user.active ? 'Activo' : 'Inactivo' },
            { label: 'Avatar', value: user.avatar ? <img src={user.avatar} alt="Avatar" style={{ maxWidth: '100px', borderRadius: '50%' }} /> : '—' },
            { label: 'Registro', value: user.createdAt ?? '—' },
            { label: 'Actualizado', value: user.updatedAt ?? '—' },
        ]}
        onClose={onClose}
    />
    )
}

export default UserDetail
