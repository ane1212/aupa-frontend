import { DashboardConfirm } from '../../../../components/common'
import { categoryService } from '../../../../services/API'
import type { Category } from '../../../../services/models'

interface Props {
    category: Category
    onDeleted: (id: string) => void
    onClose: () => void
}

const CategoryDeleteModal = ({ category, onDeleted, onClose }: Props) => (
    <DashboardConfirm
        title="Eliminar Categoría"
        description={`¿Seguro que quieres eliminar la categoría "${category.name}"? Esta acción no se puede deshacer.`}
        onConfirm={async () => {
            await categoryService.delete(category.id)
            onDeleted(category.id)
        }}
        onClose={onClose}
    />
)

export default CategoryDeleteModal
