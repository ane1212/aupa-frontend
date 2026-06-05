import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../hooks";
import { Pencil, Plus, UserCheck, Users, UserX, X } from "lucide-react";
import { DataTable, SearchInput, SelectFilter, Tooltip } from "../../../components/common";
import type { DataTableColumn } from "../../../components/common";
import { userService } from "../../../services/API";
import type { User } from "../../../services/models";
import UserDetail from "./components/UserDetail";
import UserAddModal from "./components/UserAddModal";
import UserEditModal from "./components/UserEditModal";

const DashboardUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selected, setSelected] = useState<User | null>(null)
    const [editing, setEditing] = useState<User | null>(null)
    const [showAdd, setShowAdd] = useState(false)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search)
    const [status, setStatus] = useState("all")
    const [role, setRole] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [refresh, setRefresh] = useState(0)

    // Reset to page 1 when filters/search change
    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch, status, role])

    useEffect(() => {
        setIsLoading(true)

        const params: Record<string, any> = { page: currentPage, limit: 10 }
        if (debouncedSearch) params.search = debouncedSearch
        if (status === 'activo') params.active = 'true'
        if (status === 'inactivo') params.active = 'false'
        if (role !== 'all') params.role = role

        console.log('[fetchUsers] params:', params)

        let cancelled = false
        userService.getAllUsers(params)
            .then(res => {
                if (cancelled) return
                console.log('[fetchUsers] response:', res)
                const data = res.data || (Array.isArray(res) ? res : [])
                const total = res.meta?.total ?? data.length
                setUsers(data)
                setTotalItems(total)
            })
            .catch(err => console.error('[fetchUsers] error:', err))
            .finally(() => { if (!cancelled) setIsLoading(false) })

        return () => { cancelled = true }
    }, [currentPage, debouncedSearch, status, role, refresh])

    const fetchUsers = () => setRefresh(prev => prev + 1)

    const columns = useMemo<DataTableColumn<User>[]>(() => [
        {
            key: "id",
            header: "ID",
            render: (user) => (
                <Tooltip text={user.id}>
                    <strong
                        className="dashboard-row-id"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelected(user)}
                    >
                        {user.id.slice(0, 8)}…
                    </strong>
                </Tooltip>
            ),
        },
        {
            key: "user",
            header: "Usuario",
            render: (user) => (
                <div className="dashboard-user-cell">
                    <div className="dashboard-user-avatar">{user.name.charAt(0)}</div>
                    <strong>{user.name}</strong>
                </div>
            ),
        },
        {
            key: "email",
            header: "Email",
            render: (user) => user.email,
        },
        {
            key: "role",
            header: "Rol",
            render: (user) => (
                <span className="dashboard-badge dashboard-badge-role">
                    {user.role === 'superAdmin' ? 'Admin' : user.role === 'local' ? 'Local' : 'User'}
                </span>
            ),
        },
        {
            key: "status",
            header: "Estado",
            render: (user) => (
                <span className={`dashboard-status dashboard-status-${user.active ? 'activo' : 'inactivo'}`}>
                    {user.active ? 'Activo' : 'Inactivo'}
                </span>
            ),
        },
        {
            key: "actions",
            header: "Acciones",
            render: (user) => (
                <div className="dashboard-actions">
                    <button type="button" aria-label="Editar usuario" onClick={() => setEditing(user)}>
                        <Pencil size={15} />
                    </button>
                </div>
            ),
        },
    ], [])

    const stats = useMemo(() => ({
        total: totalItems,
        activos: users.filter((u) => u.active).length,
        inactivos: users.filter((u) => !u.active).length,
    }), [users, totalItems])

    return (
        <section className="dashboard-page">
            <header className="dashboard-page-header">
                <div>
                    <h1>Gestion de Usuarios</h1>
                    <p>Administra el acceso y roles de los miembros de la comunidad Aupa.</p>
                </div>
                <button type="button" className="dashboard-primary-button" onClick={() => setShowAdd(true)}>
                    <Plus size={17} />
                    <span>Anadir Usuario</span>
                </button>
            </header>

            <div className="dashboard-stats-row">
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-blue"><Users size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{stats.total}</strong>
                        <span className="dashboard-stat-label">Total Usuarios</span>
                    </div>
                </div>
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-green"><UserCheck size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{stats.activos}</strong>
                        <span className="dashboard-stat-label">Usuarios Activos</span>
                    </div>
                </div>
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-red"><UserX size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{stats.inactivos}</strong>
                        <span className="dashboard-stat-label">Usuarios Inactivos</span>
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
                    <SelectFilter
                        label="Rol"
                        value={role}
                        onChange={setRole}
                        options={[
                            { label: "Todos los roles", value: "all" },
                            { label: "Usuario", value: "usuario" },
                            { label: "Local", value: "local" },
                            { label: "Admin", value: "superAdmin" },
                        ]}
                    />
                    {(search || status !== "all" || role !== "all") && (
                        <button
                            type="button"
                            className="dashboard-clear-button"
                            onClick={() => { setSearch(""); setStatus("all"); setRole("all"); setCurrentPage(1) }}
                        >
                            <X size={16} />
                            <span>Limpiar filtros</span>
                        </button>
                    )}
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar por nombre, email o ID..."
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={users}
                page={currentPage}
                pageSize={10}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
                isLoading={isLoading}
            />

            {showAdd && (
                <UserAddModal
                    onCreated={() => { fetchUsers(); setShowAdd(false) }}
                    onClose={() => setShowAdd(false)}
                />
            )}

            {editing && (
                <UserEditModal
                    user={editing}
                    onUpdated={(updated) => setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))}
                    onClose={() => setEditing(null)}
                />
            )}

            {selected && (
                <UserDetail
                    user={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </section>
    )
}

export default DashboardUsers
