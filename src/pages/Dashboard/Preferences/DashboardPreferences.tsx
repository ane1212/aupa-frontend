import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../hooks";
import { BookMarked, Eye, List, Search, X } from "lucide-react";
import { DataTable, SearchInput, Tooltip } from "../../../components/common";
import type { DataTableColumn } from "../../../components/common";
import { userService } from "../../../services/API";
import type { User } from "../../../services/models";
import UserDetail from "../Users/components/UserDetail";
import UserPreferencesModal from "./components/UserPreferencesModal";

const DashboardPreferences = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [preferencesUser, setPreferencesUser] = useState<User | null>(null)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch])

    useEffect(() => {
        setIsLoading(true)

        const params: Record<string, any> = { page: currentPage, limit: 10 }
        if (debouncedSearch) params.search = debouncedSearch

        let cancelled = false
        userService.getAllUsers(params)
            .then(res => {
                if (cancelled) return
                const data = res.data || (Array.isArray(res) ? res : [])
                const total = res.meta?.total ?? data.length
                setUsers(data)
                setTotalItems(total)
            })
            .catch(err => console.error('[fetchUsers] error:', err))
            .finally(() => { if (!cancelled) setIsLoading(false) })

        return () => { cancelled = true }
    }, [currentPage, debouncedSearch])

    const columns = useMemo<DataTableColumn<User>[]>(() => [
        {
            key: "id",
            header: "ID",
            render: (user) => (
                <Tooltip text={user.id}>
                    <strong className="dashboard-row-id">
                        {user.id.slice(0, 8)}…
                    </strong>
                </Tooltip>
            ),
        },
        {
            key: "name",
            header: "Usuario",
            render: (user) => (
                <div className="dashboard-user-cell">
                    {user.avatar
                        ? <img src={user.avatar} alt={user.name} className="dashboard-user-avatar" style={{ objectFit: 'cover' }} />
                        : <div className="dashboard-user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                    }
                    <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            color: 'var(--accent, #6366f1)',
                            fontWeight: 700,
                            textDecoration: 'underline',
                            textUnderlineOffset: '3px',
                        }}
                    >
                        {user.name}
                    </button>
                </div>
            ),
        },
        {
            key: "email",
            header: "Email",
            render: (user) => <span style={{ opacity: 0.7 }}>{user.email}</span>,
        },
        {
            key: "preferences",
            header: "Preferencias",
            render: (user) => (
                <div className="dashboard-actions">
                    <button
                        type="button"
                        title="Ver preferencias"
                        aria-label="Ver preferencias"
                        onClick={() => setPreferencesUser(user)}
                    >
                        <List size={15} />
                    </button>
                </div>
            ),
        },
    ], [])

    return (
        <section className="dashboard-page">
            <header className="dashboard-page-header">
                <div>
                    <h1>Preferencias de Usuarios</h1>
                    <p>Consulta las categorías favoritas que cada usuario ha guardado en la plataforma.</p>
                </div>
            </header>

            <div className="dashboard-stats-row">
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-icon dashboard-stat-icon-purple"><BookMarked size={20} /></span>
                    <div className="dashboard-stat-body">
                        <strong className="dashboard-stat-value">{totalItems}</strong>
                        <span className="dashboard-stat-label">Total Usuarios</span>
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
                        placeholder="Buscar usuario por nombre o email..."
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

            {selectedUser && (
                <UserDetail
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}

            {preferencesUser && (
                <UserPreferencesModal
                    user={preferencesUser}
                    onClose={() => setPreferencesUser(null)}
                />
            )}
        </section>
    )
}

export default DashboardPreferences
