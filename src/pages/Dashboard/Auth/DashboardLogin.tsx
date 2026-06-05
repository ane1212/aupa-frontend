import { useState, useEffect } from 'react';
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoTrimmed from '../../../assets/logo-trimmed.png';
import { useAuth } from '../../../context';
import { UserRole } from '../../../services/models';
import '../../../assets/styles/dashboard.css';

interface LoginFormData {
    email: string;
    password: string;
}

const DashboardLogin: React.FC = () => {
    const navigate = useNavigate();
    const { login, user, isAuthenticated, isLoading } = useAuth();

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            if (user?.role === UserRole.SUPER_ADMIN) {
                navigate('/dashboard/home');
            } else {
                setErrorMessage('No tienes permisos.');
            }
        }
    }, [isAuthenticated, isLoading, user, navigate]);

    const handleInputChange = (field: keyof LoginFormData) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setErrorMessage('¡Todos los campos son obligatorios!');
            return;
        }

        try {
            await login({
                email: formData.email,
                password: formData.password,
            });
        } catch {
            setErrorMessage('Credenciales inválidas');
        }
    };

    return (
        <div className="dashboard-login-container">
            <div className="dashboard-login-card">
                <div className="dashboard-login-header">
                    <img src={logoTrimmed} alt="Aupa Logo" className="dashboard-login-logo" />
                    <span className="dashboard-login-title">Dashboard</span>
                </div>

                <form onSubmit={handleSubmit} className="dashboard-login-form">
                    <div className="dashboard-login-input-group">
                        <Mail className="icon dashboard-login-input-icon" size={21} color="#666" />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email')(e.target.value)}
                            className="dashboard-login-input"
                            data-testid="email-input"
                            autoComplete="email"
                        />
                    </div>

                    <div className="dashboard-login-input-group">
                        <LockKeyhole className="icon dashboard-login-input-icon" size={21} color="#666" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password')(e.target.value)}
                            className="dashboard-login-input"
                            data-testid="password-input"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="dashboard-login-btn-toggle"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <Eye size={21} color="#666" /> : <EyeOff size={21} color="#666" />}
                        </button>
                    </div>

                    {errorMessage && (
                        <div className="dashboard-login-error">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="dashboard-login-submit"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DashboardLogin;
