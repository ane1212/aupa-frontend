import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2, UserCheck, Users, UserX, X } from "lucide-react";
import { DataTable, SearchInput, SelectFilter } from "../components/common";
import type { DataTableColumn } from "../components/common";

interface DashboardUserRow {
    id: string;
    name: string;
    email: string;
    role: "Host" | "Admin" | "User";
    status: "Activo" | "Inactivo" | "Baneado";
}

const users: DashboardUserRow[] = [
    {
        id: "#AUP-8291",
        name: "Juan Perez",
        email: "juan.perez@example.com",
        role: "Host",
        status: "Activo",
    },
];

const DashboardUsers = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [dateRange, setDateRange] = useState("30");
    const [page, setPage] = useState(1);

    const columns = useMemo<DataTableColumn<DashboardUserRow>[]>(() => [
        {
            key: "id",
            header: "ID",
            render: (user) => <strong className="dashboard-row-id">{user.id}</strong>,
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
            render: (user) => <span className="dashboard-badge dashboard-badge-role">{user.role}</span>,
        },
        {
            key: "status",
            header: "Estado",
            render: (user) => (
                <span className={`dashboard-status dashboard-status-${user.status.toLowerCase()}`}>
                    {user.status}
                </span>
            ),
        },
        {
            key: "actions",
            header: "Acciones",
            render: () => (
                <div className="dashboard-actions">
                    <button type="button" aria-label="Editar usuario">
                        <Pencil size={15} />
                    </button>
                    <button type="button" aria-label="Eliminar usuario">
                        <Trash2 size={15} />
                    </button>
                </div>
            ),
        },
    ], []);

    const filteredUsers = users.filter((user) => {
        const matchesSearch = `${user.name} ${user.email} ${user.id}`.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status === "all" || user.status.toLowerCase() === status;
        return matchesSearch && matchesStatus;
    });

    const stats = useMemo(() => ({
        total: users.length,
        activos: users.filter((u) => u.status === "Activo").length,
        baneados: users.filter((u) => u.status === "Baneado").length,
    }), []);

    return (
        <section className="dashboard-page">
            <header className="dashboard-page-header">
                <div>
                    <h1>Gestion de Usuarios</h1>
                    <p>Administra el acceso y roles de los miembros de la comunidad Aupa.</p>
                </div>
                <button type="button" className="dashboard-primary-button">
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
                        <strong className="dashboard-stat-value">{stats.baneados}</strong>
                        <span className="dashboard-stat-label">Usuarios Baneados</span>
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
                            { label: "Baneado", value: "baneado" },
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
                        onClick={() => {
                            setSearch("");
                            setStatus("all");
                            setDateRange("30");
                        }}
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
        </section>
    );
};

export default DashboardUsers;
