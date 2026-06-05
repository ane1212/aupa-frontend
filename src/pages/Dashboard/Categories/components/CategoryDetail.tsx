import { useEffect, useState } from 'react'
import { DashboardDetail } from '../../../../components/common'
import { categoryService } from '../../../../services/API'
import type { Category } from '../../../../services/models'

interface Props {
    category: Category
    onClose: () => void
}

const CategoryDetail = ({ category: initialCategory, onClose }: Props) => {
    const [category, setCategory] = useState<Category>(initialCategory)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        categoryService.getById(initialCategory.id)
            .then(res => {
                setCategory((res as any).data || res)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [initialCategory.id])

    return (
        <DashboardDetail
            title={category.name + (loading ? ' (Cargando...)' : '')}
            subtitle={category.description || ''}
            fields={[
                { label: 'ID', value: category.id },
                { label: 'Nombre', value: category.name },
                { label: 'Descripción', value: category.description || '—' },
                { label: 'Icono', value: category.icon || '—' },
                { label: 'Registro', value: category.createdAt || '—' },
                { label: 'Actualizado', value: category.updatedAt || '—' },
            ]}
            onClose={onClose}
        />
    )
}

export default CategoryDetail
