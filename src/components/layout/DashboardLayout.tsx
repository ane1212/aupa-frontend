import { Outlet, NavLink } from "react-router-dom";
import {
    Bell,
    CalendarDays,
    FolderKanban,
    Heart,
    LayoutDashboard,
    MessageSquare,
    Settings,
    ShieldAlert,
    SlidersHorizontal,
    Store,
    Tags,
    Users,
} from "lucide-react";

const dashboardLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/dashboard/users", label: "Usuarios", icon: Users },
    { to: "/dashboard/locals", label: "Locales", icon: Store },
    { to: "/dashboard/preferences", label: "Preferencias de Usuario", icon: SlidersHorizontal },
    { to: "/dashboard/favorites", label: "Favoritos", icon: Heart },
    { to: "/dashboard/incidents", label: "Incidentes", icon: ShieldAlert },
    { to: "/dashboard/events", label: "Eventos", icon: CalendarDays },
    { to: "/dashboard/comments", label: "Comentarios", icon: MessageSquare },
    { to: "/dashboard/categories", label: "Categorias", icon: Tags },
];

const DashboardLayout = () => {
    return (
        <div className="dashboard">
            <aside className="dashboard-sidebar">
                <div className="dashboard-brand">
                    <div className="dashboard-brand-icon">
                        <FolderKanban size={20} />
                    </div>
                    <div>
                        <strong>Aupa</strong>
                        <span>Superadmin</span>
                    </div>
                </div>

                <nav className="dashboard-nav">
                    {dashboardLinks.map(({ to, label, icon: Icon, end }) => (
                        <NavLink key={to} to={to} end={end} className="dashboard-nav-link">
                            <Icon size={18} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="dashboard-admin">
                    <div className="dashboard-admin-avatar">A</div>
                    <div>
                        <strong>Admin Principal</strong>
                        <span>admin@aupa.com</span>
                    </div>
                </div>
            </aside>

            <div className="dashboard-content">
                <header className="dashboard-header">
                    <div className="dashboard-header-actions">
                        <Bell size={18} />
                        <Settings size={18} />
                    </div>
                </header>

                <main className="dashboard-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
