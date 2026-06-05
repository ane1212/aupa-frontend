import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../hooks";
import { Tags, Plus, Trash2, Pencil, Search, X } from "lucide-react";
import { DataTable, SearchInput, Tooltip } from "../../../components/common";
import type { DataTableColumn } from "../../../components/common";
import { categoryService } from "../../../services/API";
import type { Category } from "../../../services/models";
import CategoryDetail from "./components/CategoryDetail";
import CategoryAddModal from "./components/CategoryAddModal";
import CategoryEditModal from "./components/CategoryEditModal";
import CategoryDeleteModal from "./components/CategoryDeleteModal";

const DashboardCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selected, setSelected] = useState<Category | null>(null)
    const [editing, setEditing] = useState<Category | null>(null)
    const [deleting, setDeleting] = useState<Category | null>(null)
    const [showAdd, setShowAdd] = useState(false)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch])

    useEffect(() => {
        setIsLoading(true)

        const params: Record<string, any> = { page: currentPage, limit: 10 }
        if (debouncedSearch) params.search = debouncedSearch

        let cancelled = false
        categoryService.getAll(params)
            .then(res => {
                if (cancelled) return
                const data = res.data?.data || (Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []))
                const total = res.data?.meta?.total ?? res.meta?.total ?? data.length
                setCategories(data)
                setTotalItems(total)
            })
            .catch(err => console.error('[fetchCategories] error:', err))
            .finally(() => { if (!cancelled) setIsLoading(false) })

        return () => { cancelled = true }
    }, [currentPage, debouncedSearch, refresh])

    const fetchCategories = () => setRefresh(prev => prev + 1)

    const columns = useMemo<DataTableColumn<Category>[]>(() => [
        {
            key: "id",
            header: "ID",
            render: (cat) => (
                <Tooltip text={cat.id}>
                    <strong
                        className="dashboard-row-id"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelected(cat)}
                    >
                        {cat.id.slice(0, 8)}…
                    </strong>
                </Tooltip>
            ),
        },
        {
            key: "name",
            header: "Categoría",
            render: (cat) => (
                <div className="dashboard-user-cell">
                    <div className="dashboard-user-avatar">
                        <Tags size={16} />
                    </div>
                    <strong>{cat.name}</strong>
                </div>
            ),
        },
        {
            key: "description",
            header: "Descripción",
            render: (cat) => cat.description || '—',
        },
        {
            key: "icon",
            header: "Icono",
            render: (cat) => cat.icon || '—',
        },
        {
            key: "actions",
            header: "Acciones",
            render: (cat) => (
                <div className="dashboard-actions">
                    <button type="button" aria-label="Editar categoría" onClick={() => setEditing(cat)}>
                        <Pencil size={15} />
                    </button>
                    <button type="button" aria-label="Eliminar categoría" onClick={() => setDeleting(cat)}>
                        <Trash2 size={15} />
                    </button>
                </div>
            ),
        },
    ], [])

    const stats = useMemo(() => ({
        total: totalItems,
    }), [totalItems])

    return (
        <section className="dashboard-page">
            <header className="dashboard-page-header">
                <div>
                    <h1>Gestión de Categorías</h1>
                    <p>Administra las diferentes categorías y etiquetas de la plataforma.</p>
                </div>
                <button type="button" className="dashboard-primary-button" onClick={() => setShowAdd(true)}>
                    <Plus size={17} />
                    <span>Añadir Categoría</span>
                </button>
            </header>

            <div className="dashboard-stats-row">
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-blue"><Tags size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{stats.total}</strong>
                        <span className="dashboard-stat-label">Total Categorías</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-filters-card">
                <div className="dashboard-filters-row">
                    {search && (
                        <button
                            type="button"
                            className="dashboard-clear-button"
                            onClick={() => { setSearch(""); setCurrentPage(1) }}
                        >
                            <X size={16} />
                            <span>Limpiar filtros</span>
                        </button>
                    )}
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar por nombre o ID..."
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={categories}
                page={currentPage}
                pageSize={10}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
                isLoading={isLoading}
            />

            {showAdd && (
                <CategoryAddModal
                    onCreated={() => { fetchCategories(); setShowAdd(false) }}
                    onClose={() => setShowAdd(false)}
                />
            )}

            {editing && (
                <CategoryEditModal
                    category={editing}
                    onUpdated={(updated) => setCategories(prev => prev.map(u => u.id === updated.id ? updated : u))}
                    onClose={() => setEditing(null)}
                />
            )}

            {deleting && (
                <CategoryDeleteModal
                    category={deleting}
                    onDeleted={(id) => setCategories(prev => prev.filter(u => u.id !== id))}
                    onClose={() => setDeleting(null)}
                />
            )}

            {selected && (
                <CategoryDetail
                    category={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </section>
    )
}

export default DashboardCategories
