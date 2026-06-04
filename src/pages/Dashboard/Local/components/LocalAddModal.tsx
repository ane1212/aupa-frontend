import { DashboardForm } from '../../../../components/common'
import { localService } from '../../../../services/API'

interface Props {
    onCreated: () => void
    onClose: () => void
}

const LocalAddModal = ({ onCreated, onClose }: Props) => (
    <DashboardForm
        title="Añadir Local"
        fields={[
            { key: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre del local', required: true },
            { key: 'address', label: 'Dirección', type: 'text', placeholder: 'Dirección completa', required: true },
            { key: 'description', label: 'Descripción', type: 'text', placeholder: 'Descripción', required: false },
            { key: 'phone', label: 'Teléfono', type: 'text', placeholder: 'Teléfono', required: false },
            { key: 'image', label: 'URL Imagen', type: 'text', placeholder: 'https://...', required: false },
        ]}
        onSubmit={async (data) => {
            await localService.create(data as any)
            onCreated()
        }}
        onClose={onClose}
    />
)

export default LocalAddModal
