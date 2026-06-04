import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2, UserCheck, Users, UserX, X } from "lucide-react";
import { DataTable, SearchInput, SelectFilter, Tooltip } from "../../../components/common";
import type { DataTableColumn } from "../../../components/common";
import { userService } from "../../../services/API";
import type { User } from "../../../services/models";
import UserDetail from "./components/UserDetail";
import UserAddModal from "./components/UserAddModal";
import UserEditModal from "./components/UserEditModal";
import UserDeleteModal from "./components/UserDeleteModal";

const DashboardUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selected, setSelected] = useState<User | null>(null)
    const [editing, setEditing] = useState<User | null>(null)
    const [deleting, setDeleting] = useState<User | null>(null)
    const [showAdd, setShowAdd] = useState(false)
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("all")
    const [dateRange, setDateRange] = useState("30")
    const [page, setPage] = useState(1)

    useEffect(() => {
        userService.getAllUsers()
            .then(setUsers)
            .finally(() => setIsLoading(false))
    }, [])

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
                    <button type="button" aria-label="Eliminar usuario" onClick={() => setDeleting(user)}>
                        <Trash2 size={15} />
                    </button>
                </div>
            ),
        },
    ], [])

    const filteredUsers = users.filter((user) => {
        const matchesSearch = `${user.name} ${user.email} ${user.id}`.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = status === "all" ||
            (status === "activo" && user.active) ||
            (status === "inactivo" && !user.active)
        return matchesSearch && matchesStatus
    })

    const stats = useMemo(() => ({
        total: users.length,
        activos: users.filter((u) => u.active).length,
        inactivos: users.filter((u) => !u.active).length,
    }), [users])

    if (isLoading) return <p>Cargando...</p>

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
                        label="Fecha de Registro"
                        value={dateRange}
                        onChange={setDateRange}
                        options={[
                            { label: "Ultimos 30 dias", value: "30" },
                            { label: "Ultimos 7 dias", value: "7" },
                            { label: "Este ano", value: "year" },
                        ]}
                    />
                    <button
                        type="button"
                        className="dashboard-clear-button"
                        onClick={() => { setSearch(""); setStatus("all"); setDateRange("30") }}
                    >
                        <X size={16} />
                        <span>Limpiar filtros</span>
                    </button>
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar por nombre, email o ID..."
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredUsers}
                page={page}
                pageSize={10}
                totalItems={filteredUsers.length}
                onPageChange={setPage}
            />

            {showAdd && (
                <UserAddModal
                    onCreated={setUsers}
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

            {deleting && (
                <UserDeleteModal
                    user={deleting}
                    onDeleted={(id) => setUsers(prev => prev.filter(u => u.id !== id))}
                    onClose={() => setDeleting(null)}
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
