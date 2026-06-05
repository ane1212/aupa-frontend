import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../hooks";
import { Store, Trash2, Pencil, CheckCircle, Clock, X } from "lucide-react";
import { DataTable, SearchInput, SelectFilter, Tooltip } from "../../../components/common";
import type { DataTableColumn } from "../../../components/common";
import { localService } from "../../../services/API";
import type { Local } from "../../../services/models";
import LocalDetail from "./components/LocalDetail";
import LocalEditModal from "./components/LocalEditModal";
import LocalDeleteModal from "./components/LocalDeleteModal";

const DashboardLocals = () => {
    const [locals, setLocals] = useState<Local[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selected, setSelected] = useState<Local | null>(null)
    const [editing, setEditing] = useState<Local | null>(null)
    const [deleting, setDeleting] = useState<Local | null>(null)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search)
    const [status, setStatus] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [refresh, setRefresh] = useState(0)

    // Reset to page 1 when filters/search change
    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch, status])

    useEffect(() => {
        setIsLoading(true)

        const params: Record<string, any> = { page: currentPage, limit: 10 }
        if (debouncedSearch) params.search = debouncedSearch
        if (status !== 'all') params.status = status

        let cancelled = false
        localService.getAll(params)
            .then(res => {
                if (cancelled) return
                setLocals(res.data || [])
                setTotalItems(res.meta?.total ?? 0)
            })
            .catch(err => console.error('[fetchLocals] error:', err))
            .finally(() => { if (!cancelled) setIsLoading(false) })

        return () => { cancelled = true }
    }, [currentPage, debouncedSearch, status, refresh])

    const fetchLocals = () => setRefresh(prev => prev + 1)

    const columns = useMemo<DataTableColumn<Local>[]>(() => [
        {
            key: "id",
            header: "ID",
            render: (local) => (
                <Tooltip text={local.id}>
                    <strong
                        className="dashboard-row-id"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelected(local)}
                    >
                        {local.id.slice(0, 8)}…
                    </strong>
                </Tooltip>
            ),
        },
        {
            key: "name",
            header: "Local",
            render: (local) => (
                <div className="dashboard-user-cell">
                    <div className="dashboard-user-avatar">
                        {local.image ? <img src={local.image} alt={local.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} /> : local.name.charAt(0)}
                    </div>
                    <strong>{local.name}</strong>
                </div>
            ),
        },
        {
            key: "address",
            header: "Dirección",
            render: (local) => local.address,
        },
        {
            key: "status",
            header: "Estado",
            render: (local) => {
                let colorClass = 'dashboard-status-inactivo'
                if (local.status === 'aprobado') colorClass = 'dashboard-status-activo'
                if (local.status === 'pendiente') colorClass = 'dashboard-badge-role'

                return (
                    <span className={`dashboard-status ${colorClass}`}>
                        {local.status.charAt(0).toUpperCase() + local.status.slice(1)}
                    </span>
                )
            },
        },
        {
            key: "actions",
            header: "Acciones",
            render: (local) => (
                <div className="dashboard-actions">
                    <button type="button" aria-label="Editar estado" onClick={() => setEditing(local)}>
                        <Pencil size={15} />
                    </button>
                    <button type="button" aria-label="Eliminar local" onClick={() => setDeleting(local)}>
                        <Trash2 size={15} />
                    </button>
                </div>
            ),
        },
    ], [])

    const stats = useMemo(() => ({
        total: totalItems,
        aprobados: locals.filter((l) => l.status === 'aprobado').length,
        pendientes: locals.filter((l) => l.status === 'pendiente').length,
        rechazados: locals.filter((l) => l.status === 'rechazado').length,
    }), [locals, totalItems])

    return (
        <section className="dashboard-page">
            <header className="dashboard-page-header">
                <div>
                    <h1>Gestión de Locales</h1>
                    <p>Administra los locales, negocios y puntos de interés de la comunidad.</p>
                </div>
            </header>

            <div className="dashboard-stats-row">
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-blue"><Store size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{stats.total}</strong>
                        <span className="dashboard-stat-label">Total Locales</span>
                    </div>
                </div>
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-green"><CheckCircle size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{stats.aprobados}</strong>
                        <span className="dashboard-stat-label">Aprobados</span>
                    </div>
                </div>
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-yellow"><Clock size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{stats.pendientes}</strong>
                        <span className="dashboard-stat-label">Pendientes</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-filters-card">
                <div className="dashboard-filters-row">
                    <SelectFilter
                        label="Estado"
                        value={status}
                        onChange={setStatus}
                        options={[
                            { label: "Todos los estados", value: "all" },
                            { label: "Pendiente", value: "pendiente" },
                            { label: "Aprobado", value: "aprobado" },
                            { label: "Rechazado", value: "rechazado" },
                        ]}
                    />
                    {(search || status !== "all") && (
                        <button
                            type="button"
                            className="dashboard-clear-button"
                            onClick={() => { setSearch(""); setStatus("all"); setCurrentPage(1) }}
                        >
                            <X size={16} />
                            <span>Limpiar filtros</span>
                        </button>
                    )}
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar por nombre, dirección o ID..."
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={locals}
                page={currentPage}
                pageSize={10}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
                isLoading={isLoading}
            />

            {editing && (
                <LocalEditModal
                    local={editing}
                    onUpdated={(updated) => setLocals(prev => prev.map(u => u.id === updated.id ? updated : u))}
                    onClose={() => setEditing(null)}
                />
            )}

            {deleting && (
                <LocalDeleteModal
                    local={deleting}
                    onDeleted={(id) => setLocals(prev => prev.filter(u => u.id !== id))}
                    onClose={() => setDeleting(null)}
                />
            )}

            {selected && (
                <LocalDetail
                    local={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </section>
    )
}

export default DashboardLocals
