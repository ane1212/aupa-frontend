import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../hooks";
import { Calendar, Plus, Trash2, Pencil, CheckCircle, XCircle, Clock, X, MessageSquare, AlertTriangle } from "lucide-react";
import { DataTable, SearchInput, SelectFilter, Tooltip } from "../../../components/common";
import type { DataTableColumn } from "../../../components/common";
import { eventService, categoryService } from "../../../services/API";
import type { Event, Category } from "../../../services/models";
import EventDetail from "./components/EventDetail";
import EventAddModal from "./components/EventAddModal";
import EventEditModal from "./components/EventEditModal";
import EventDeleteModal from "./components/EventDeleteModal";
import EventCommentsModal from "./components/EventCommentsModal";
import EventIncidentsModal from "./components/EventIncidentsModal";

const DashboardEvents = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [categories, setCategories] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(true)
    const [selected, setSelected] = useState<Event | null>(null)
    const [editing, setEditing] = useState<Event | null>(null)
    const [deleting, setDeleting] = useState<Event | null>(null)
    const [viewingComments, setViewingComments] = useState<Event | null>(null)
    const [viewingIncidents, setViewingIncidents] = useState<Event | null>(null)
    
    const [showAdd, setShowAdd] = useState(false)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search)
    const [status, setStatus] = useState("all") // 'activo' or 'inactivo'
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [refresh, setRefresh] = useState(0)

    // Load Categories once to map categoryId to Name
    useEffect(() => {
        categoryService.getAll({ limit: 100 })
            .then(res => {
                const cats = res.data?.data || (Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []))
                const catMap: Record<string, string> = {}
                cats.forEach((c: Category) => {
                    catMap[c.id] = c.name
                })
                setCategories(catMap)
            })
            .catch(console.error)
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch, status])

    useEffect(() => {
        setIsLoading(true)

        const params: Record<string, any> = { page: currentPage, limit: 10 }
        if (debouncedSearch) params.search = debouncedSearch
        if (status === 'activo') params.active = 'true'
        if (status === 'inactivo') params.active = 'false'

        let cancelled = false
        eventService.getAll(params)
            .then(res => {
                if (cancelled) return
                const data = res.data?.data || (Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []))
                const total = res.data?.meta?.total ?? res.meta?.total ?? data.length
                setEvents(data)
                setTotalItems(total)
            })
            .catch(err => console.error('[fetchEvents] error:', err))
            .finally(() => { if (!cancelled) setIsLoading(false) })

        return () => { cancelled = true }
    }, [currentPage, debouncedSearch, status, refresh])

    const fetchEvents = () => setRefresh(prev => prev + 1)

    const columns = useMemo<DataTableColumn<Event>[]>(() => [
        {
            key: "id",
            header: "ID",
            render: (event) => (
                <Tooltip text={event.id}>
                    <strong
                        className="dashboard-row-id"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelected(event)}
                    >
                        {event.id.slice(0, 8)}…
                    </strong>
                </Tooltip>
            ),
        },
        {
            key: "title",
            header: "Evento",
            render: (event) => (
                <div className="dashboard-user-cell">
                    <div className="dashboard-user-avatar">
                        {event.image ? <img src={event.image} alt={event.title} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} /> : event.title.charAt(0)}
                    </div>
                    <strong>{event.title}</strong>
                </div>
            ),
        },
        {
            key: "category",
            header: "Categoría",
            render: (event) => event.categoryId && categories[event.categoryId] ? categories[event.categoryId] : '—',
        },
        {
            key: "date",
            header: "Fecha",
            render: (event) => `${event.date} ${event.startTime}`,
        },
        {
            key: "comments",
            header: "Comentarios",
            render: (event) => (
                <button 
                    type="button" 
                    className="dashboard-badge dashboard-badge-role" 
                    style={{cursor: 'pointer', border: 'none'}} 
                    onClick={() => setViewingComments(event)}
                >
                    <MessageSquare size={12} style={{marginRight: '4px'}}/> Ver
                </button>
            ),
        },
        {
            key: "incidents",
            header: "Incidencias",
            render: (event) => (
                <button 
                    type="button" 
                    className="dashboard-badge dashboard-status-inactivo" 
                    style={{cursor: 'pointer', border: 'none'}} 
                    onClick={() => setViewingIncidents(event)}
                >
                    <AlertTriangle size={12} style={{marginRight: '4px'}}/> Ver
                </button>
            ),
        },
        {
            key: "status",
            header: "Estado",
            render: (event) => (
                <span className={`dashboard-status dashboard-status-${event.active ? 'activo' : 'inactivo'}`}>
                    {event.active ? 'Activo' : 'Inactivo'}
                </span>
            ),
        },
        {
            key: "actions",
            header: "Acciones",
            render: (event) => (
                <div className="dashboard-actions">
                    <button type="button" aria-label="Editar evento" onClick={() => setEditing(event)}>
                        <Pencil size={15} />
                    </button>
                    <button type="button" aria-label="Eliminar evento" onClick={() => setDeleting(event)}>
                        <Trash2 size={15} />
                    </button>
                </div>
            ),
        },
    ], [categories])

    const stats = useMemo(() => ({
        total: totalItems,
        activos: events.filter((e) => e.active).length,
        inactivos: events.filter((e) => !e.active).length,
    }), [events, totalItems])

    return (
        <section className="dashboard-page">
            <header className="dashboard-page-header">
                <div>
                    <h1>Gestión de Eventos</h1>
                    <p>Administra los eventos de la comunidad, revisa sus comentarios e incidencias.</p>
                </div>
                <button type="button" className="dashboard-primary-button" onClick={() => setShowAdd(true)}>
                    <Plus size={17} />
                    <span>Añadir Evento</span>
                </button>
            </header>

            <div className="dashboard-stats-row">
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-blue"><Calendar size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{stats.total}</strong>
                        <span className="dashboard-stat-label">Total Eventos</span>
                    </div>
                </div>
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-green"><CheckCircle size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{stats.activos}</strong>
                        <span className="dashboard-stat-label">Activos</span>
                    </div>
                </div>
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-red"><XCircle size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{stats.inactivos}</strong>
                        <span className="dashboard-stat-label">Inactivos</span>
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
                            { label: "Activo", value: "activo" },
                            { label: "Inactivo", value: "inactivo" },
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
                        placeholder="Buscar por título o ID..."
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={events}
                page={currentPage}
                pageSize={10}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
                isLoading={isLoading}
            />

            {showAdd && (
                <EventAddModal
                    onCreated={() => { fetchEvents(); setShowAdd(false) }}
                    onClose={() => setShowAdd(false)}
                />
            )}

            {editing && (
                <EventEditModal
                    event={editing}
                    onUpdated={(updated) => setEvents(prev => prev.map(u => u.id === updated.id ? updated : u))}
                    onClose={() => setEditing(null)}
                />
            )}

            {deleting && (
                <EventDeleteModal
                    event={deleting}
                    onDeleted={(id) => setEvents(prev => prev.filter(u => u.id !== id))}
                    onClose={() => setDeleting(null)}
                />
            )}

            {selected && (
                <EventDetail
                    event={selected}
                    onClose={() => setSelected(null)}
                />
            )}

            {viewingComments && (
                <EventCommentsModal
                    event={viewingComments}
                    onClose={() => setViewingComments(null)}
                />
            )}

            {viewingIncidents && (
                <EventIncidentsModal
                    event={viewingIncidents}
                    onClose={() => setViewingIncidents(null)}
                />
            )}
        </section>
    )
}

export default DashboardEvents
