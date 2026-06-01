import { NavLink, useNavigate } from 'react-router-dom';
import { House, MapPin, Star, Heart, CircleUser } from 'lucide-react';

const NavBar = () => (
    <nav>
        <NavLink
            to="/home"
            className={({ isActive }) => isActive ? 'active' : ''}
        >
            <House size={24} color="currentColor" />
            <span>Home</span>
        </NavLink>

        <NavLink
            to="/nearby"
            className={({ isActive }) => isActive ? 'active' : ''}
        >
            <MapPin size={24} color="currentColor" />
            <span>Nearby</span>
        </NavLink>

        <NavLink
            to="/experiences"
            className={({ isActive }) => isActive ? 'active' : ''}
        >
            <Star size={24} color="currentColor" />
            <span>Experiences</span>
        </NavLink>

        <NavLink
            to="/saved"
            className={({ isActive }) => isActive ? 'active' : ''}
        >
            <Heart size={24} color="currentColor" />
            <span>Saved</span>
        </NavLink>

        <NavLink
            to="/profile"
            className={({ isActive }) => isActive ? 'active' : ''}
        >
            <CircleUser size={24} color="currentColor" />
            <span>Profile</span>
        </NavLink>
    </nav>
);

export default NavBar;