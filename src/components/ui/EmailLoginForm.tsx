import { useState } from 'react';
import PasswordInput from './PasswordInput';
import { Mail, ArrowLeft } from 'lucide-react';
import footer from '../../assets/redfooter.png';
import AuthLink from './AuthLink';
import { authService } from '../../services/API';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
    email: string;
    password: string;
}

interface EmailLoginFormProps {
    onBack: () => void;
}

const EmailLoginForm: React.FC<EmailLoginFormProps> = ({ onBack }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (field: keyof LoginFormData) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setErrorMessage('All fields need to be filled!');
            return;
        }

        if (formData.email.length < 7 || !formData.email.includes('@') || !formData.email.includes('.')) {
            setErrorMessage('Email address is incorrect!');
            return;
        }

        if (formData.password.length < 8) {
            setErrorMessage('Password needs at least 8 characters!');
            return;
        }

        try {
            const { token } = await authService.login({
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem('token', token);
            setErrorMessage('Logged in successfully');
            navigate('/home');
        } catch {
            setErrorMessage('Invalid credentials');
        }
    };

    return (
        <div className="login">
            <div className="register-header">
                <h2>Welcome back</h2>
                <span>Sign in to your Aupa! account</span>
                <br />
                <button type="button" className="btn-back" onClick={onBack}>
                    <ArrowLeft className="icon-back" size={21} color="currentColor" />
                </button>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>

                <div className="account-container">
                    <Mail className="icon" size={21} color="currentColor" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email')(e.target.value)}
                        className="input-box"
                        data-testid="email-input"
                        autoComplete="email"
                    />
                </div>

                <PasswordInput testId="password-input" placeholder="Password" value={formData.password} onChange={handleInputChange('password')} />

                <div className="error-message">{errorMessage}</div>

                <button type="submit" className="account-btn">Sign in</button>
                <AuthLink mainText="Don't have an account?" linkTo="/register" linkText="Register here!" />
            </form>

            <img className="footer" src={footer} alt="footer" />
        </div>
    );
};

export default EmailLoginForm;