import { DashboardForm } from '../../../../components/common'
import { categoryService } from '../../../../services/API'
import type { Category } from '../../../../services/models'
import { CategoryType } from '../../../../services/models/category'

interface Props {
    category: Category
    onUpdated: (updated: Category) => void
    onClose: () => void
}

const CategoryEditModal = ({ category, onUpdated, onClose }: Props) => {
    const categoryOptions = Object.values(CategoryType).map(val => ({
        label: val.charAt(0).toUpperCase() + val.slice(1).replace('_', ' '),
        value: val
    }))

    return (
        <DashboardForm
            title="Editar Categoría"
            initialValues={{
                name: category.name,
                description: category.description || '',
                icon: category.icon || '',
            }}
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
                const updated = await categoryService.update(category.id, data as any)
                onUpdated(updated)
            }}
            onClose={onClose}
        />
    )
}

export default CategoryEditModal
