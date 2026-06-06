import { Outlet, NavLink, useNavigate } from "react-router-dom";
import '../../assets/styles/local.css';
import logoTrimmed from '../../assets/logo-trimmed.png';
import {
    LayoutDashboard,
    List,
    Plus,
    Sparkles,
    User,
    LogOut
} from "lucide-react";
import { useAuth } from "../../context";
import NotificationPanel from "./NotificationPanel";

const LocalLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="local-layout">
            <header className="local-header">
                <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={logoTrimmed} alt="Aupa Logo" style={{ height: '32px' }} />
                    <span className="local-header-title">Aupa Partner</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <NotificationPanel />
                    <button 
                        onClick={handleLogout} 
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer', 
                            color: '#64748b',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        title="Cerrar Sesión"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="local-main-content">
                <Outlet />
            </main>

            <nav className="local-bottom-nav">
                <NavLink to="/local/home" className={({ isActive }) => `local-nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={22} className="local-nav-item-icon" />
                    <span>Home</span>
                </NavLink>

                <NavLink to="/local/listing" className={({ isActive }) => `local-nav-item ${isActive ? 'active' : ''}`}>
                    <List size={22} className="local-nav-item-icon" />
                    <span>Listing</span>
                </NavLink>

                <NavLink to="/local/create" className={({ isActive }) => `local-nav-item local-nav-center-btn ${isActive ? 'active' : ''}`}>
                    <Plus size={28} />
                </NavLink>

                <NavLink to="/local/experiences" className={({ isActive }) => `local-nav-item ${isActive ? 'active' : ''}`}>
                    <Sparkles size={22} className="local-nav-item-icon" />
                    <span>Experiencias</span>
                </NavLink>

                <NavLink to="/local/profile" className={({ isActive }) => `local-nav-item ${isActive ? 'active' : ''}`}>
                    <User size={22} className="local-nav-item-icon" />
                    <span>Perfil</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default LocalLayout;
