import { NavLink } from 'react-router-dom';
import { House, MapPin, Star, Heart, CircleUser } from 'lucide-react';
import { useAuth } from '../../context';
import { getAppCopy } from '../../i18n/copy';
import logoTrimmed from '../../assets/logo-trimmed.png';

interface NavItem {
    to: string;
    icon: React.ComponentType<{ size?: number; color?: string; fill?: string; strokeWidth?: number }>;
    label: string;
    solidFill?: boolean;
}

interface NavBarItemProps extends NavItem {}

const NavBarItem = ({ to, icon: Icon, label, solidFill }: NavBarItemProps) => (
    <NavLink to={to} className={({ isActive }) => isActive ? 'active' : ''}>
        {({ isActive }) => (
            <>
                <Icon
                    size={24}
                    color={isActive ? 'white' : 'currentColor'}
                    fill={isActive ? 'var(--tone9)' : 'none'}
                    strokeWidth={isActive && solidFill ? 0 : 2}
                />
                <span>{label}</span>
            </>
        )}
    </NavLink>
);

const NavBar = () => {
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);

    const navItems: NavItem[] = [
        { to: '/home', icon: House, label: copy.nav.home, solidFill: true },
        { to: '/nearby', icon: MapPin, label: copy.nav.nearby },
        { to: '/experiences', icon: Star, label: copy.nav.experiences, solidFill: true },
        { to: '/saved', icon: Heart, label: copy.nav.saved, solidFill: true },
        { to: '/profile', icon: CircleUser, label: copy.nav.profile },
    ];

    return (
        <nav>
            <div className="app-sidebar-brand">
                <img src={logoTrimmed} alt="Aupa" style={{ height: '28px' }} />
            </div>
            {navItems.map((item) => (
                <NavBarItem key={item.to} {...item} />
            ))}
        </nav>
    );
};

export default NavBar;
