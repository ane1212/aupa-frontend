import { DashboardForm } from '../../../../components/common'
import { categoryService } from '../../../../services/API'
import { CategoryType } from '../../../../services/models/category'

interface Props {
    onCreated: () => void
    onClose: () => void
}

const CategoryAddModal = ({ onCreated, onClose }: Props) => {
    const categoryOptions = Object.values(CategoryType).map(val => ({
        label: val.charAt(0).toUpperCase() + val.slice(1).replace('_', ' '),
        value: val
    }))

    return (
        <DashboardForm
            title="Añadir Categoría"
            fields={[
                { 
                    key: 'name', 
                    label: 'Nombre (Tipo)', 
                    type: 'select', 
                    required: true,
                    options: categoryOptions
                },
                { key: 'description', label: 'Descripción', type: 'text', required: false },
                { key: 'icon', label: 'Icono (URL o clase)', type: 'text', required: false },
            ]}
            onSubmit={async (data) => {
                await categoryService.create(data as any)
                onCreated()
            }}
            onClose={onClose}
        />
    )
}

export default CategoryAddModal
