// components/layout/AuthLayout.tsx
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="auth">
            <main className="auth-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;