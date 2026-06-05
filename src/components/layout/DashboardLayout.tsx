import { Outlet, NavLink, useNavigate } from "react-router-dom";
import '../../assets/styles/dashboard.css'
import logoTrimmed from '../../assets/logo-trimmed.png'
import {
    CalendarDays,
    LayoutDashboard,
    LogOut,
    SlidersHorizontal,
    Store,
    Tags,
    Users,
} from "lucide-react";
import { useAuth } from "../../context";
import NotificationPanel from "./NotificationPanel";

const dashboardLinks = [
    { to: "/dashboard/home", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/dashboard/users", label: "Usuarios", icon: Users },
    { to: "/dashboard/locals", label: "Locales", icon: Store },
    { to: "/dashboard/preferences", label: "Preferencias de Usuario", icon: SlidersHorizontal },
    { to: "/dashboard/events", label: "Eventos", icon: CalendarDays },
    { to: "/dashboard/categories", label: "Categorias", icon: Tags },
];

const DashboardLayout = () => {
    const { logout, user } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="dashboard">
            <aside className="dashboard-sidebar">
                <div className="dashboard-brand">
                    <div>
                        <img src={logoTrimmed} alt="Aupa" style={{ height: '40px', display: 'block' }} />
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
                    <div className="dashboard-admin-avatar">{user?.name.charAt(0) ?? 'A'}</div>
                    <div>
                        <strong>{user?.name ?? 'Admin'}</strong>
                        <span>{user?.email ?? ''}</span>
                    </div>
                    <button className="dashboard-logout-btn" onClick={handleLogout} title="Cerrar sesión">
                        <LogOut size={16} />
                    </button>
                </div>
            </aside>

            <div className="dashboard-content">
                <header className="dashboard-header">
                    <div className="dashboard-header-actions">
                        <NotificationPanel />
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
