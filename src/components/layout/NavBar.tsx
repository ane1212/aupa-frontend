import { NavLink, useNavigate } from 'react-router-dom';
import { House, MapPin, Star, Heart, User } from 'lucide-react';

const NavBar = () => (
    <nav>
        <NavLink
            to="/home"
            className={({ isActive }) => isActive ? 'active' : ''}
        >
            <House size={24} />
            <span>Home</span>
        </NavLink>

        <NavLink
            to="/nearby"
            className={({ isActive }) => isActive ? 'active' : ''}
        >
            <MapPin size={24} />
            <span>Nearby</span>
        </NavLink>

        <NavLink
            to="/experiences"
            className={({ isActive }) => isActive ? 'active' : ''}
        >
            <Star size={24} />
            <span>Experiences</span>
        </NavLink>

        <NavLink
            to="/saved"
            className={({ isActive }) => isActive ? 'active' : ''}
        >
            <Heart size={24} />
            <span>Saved</span>
        </NavLink>

        <NavLink
            to="/profile"
            className={({ isActive }) => isActive ? 'active' : ''}
        >
            <User size={24} />
            <span>Profile</span>
        </NavLink>
    </nav>
);

export default NavBar;