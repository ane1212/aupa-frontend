import { NavLink } from 'react-router-dom';
import { House, MapPin, Star, Heart, CircleUser } from 'lucide-react';
import { useAuth } from '../../context';
import { getAppCopy } from '../../i18n/copy';

interface NavItem {
    to: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    label: string;
}

interface NavBarItemProps {
    to: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    label: string;
}

const NavBarItem = ({ to, icon: Icon, label }: NavBarItemProps) => (
    <NavLink to={to} className={({ isActive }) => isActive ? 'active' : ''}>
        <Icon size={24} color="currentColor" />
        <span>{label}</span>
    </NavLink>
);

const NavBar = () => {
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);

    const navItems: NavItem[] = [
        { to: '/home', icon: House, label: copy.nav.home },
        { to: '/nearby', icon: MapPin, label: copy.nav.nearby },
        { to: '/experiences', icon: Star, label: copy.nav.experiences },
        { to: '/saved', icon: Heart, label: copy.nav.saved },
        { to: '/profile', icon: CircleUser, label: copy.nav.profile },
    ];

    return (
        <nav>
            {navItems.map((item) => (
                <NavBarItem key={item.to} {...item} />
            ))}
        </nav>
    );
};

export default NavBar;
