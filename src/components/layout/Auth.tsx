// components/layout/AuthLayout.tsx
import { Outlet } from 'react-router-dom';
import footer from '../../assets/redfooter.png'

const AuthLayout = () => {
    return (
        <div className="auth">
            <main className="auth-main">
                <Outlet />
                <img className="footer" src={footer} alt="footer" />
            </main>
        </div>
    );
};

export default AuthLayout;