import { useState } from 'react';
import PasswordInput from '../components/ui/PasswordInput';
import { Mail } from 'lucide-react';
import footer from '../assets/redfooter.png'

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (field: keyof LoginFormData) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrorMessage('');
    };

    const handleSubmit = (e: React.SubmitEvent) => {
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

        setErrorMessage('Logged in successfully')
        // auth
    };

    return (
        <div className="login">
            <div className="register-header">
                <h2>Welcome back</h2>
                <span>Sign in to your Aupa! account</span>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>

                <div className="email-container">
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
                <button type="submit" className="create-account-btn">Sign in</button>
                <span className="span-text">
                    Don't have an account? <br />
                    <a href="/register" className="terms-link">Register here!</a>
                </span>
            </form>

            <span className="span-text">
                By creating an account, you agree to the{' '}
                <a href="/terms" className="terms-link">Terms of Service</a> &{' '}
                <a href="/privacy" className="terms-link">Privacy Policy</a>
            </span>

            <img className="footer" src={footer} alt="footer" />
        </div>
    );
};

export default Login;
