import { NavLink } from 'react-router-dom';
import { House, MapPin, Star, Heart, CircleUser } from 'lucide-react';

interface NavItem {
    to: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    label: string;
}

const navItems: NavItem[] = [
    { to: '/home', icon: House, label: 'Home' },
    { to: '/nearby', icon: MapPin, label: 'Nearby' },
    { to: '/experiences', icon: Star, label: 'Experiences' },
    { to: '/saved', icon: Heart, label: 'Saved' },
    { to: '/profile', icon: CircleUser, label: 'Profile' },
];

interface NavBarItemProps {
    to: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    label: string;
}

const NavBarItem = ({ to, icon: Icon, label }: NavBarItemProps) => (
    <NavLink to={to} className={({ isActive }) => isActive ? 'active' : ''} >
        <Icon size={24} color="currentColor" />
        <span>{label}</span>
    </NavLink>
);

const NavBar = () => (
    <nav>
        {navItems.map((item) => (<NavBarItem key={item.to} {...item} />))}
    </nav>
);

export default NavBar;