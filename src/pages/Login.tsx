import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../components/ui/PasswordInput';
import { Mail } from 'lucide-react';
import footer from '../assets/redfooter.png'
import { useAuth } from '../context';

const Login: React.FC = () => {
    const { login, user } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (user) {
            navigate(user.role === 'superAdmin' ? '/dashboard' : '/home', { replace: true })
        }
    }, [user])

    const handleInputChange = (field: 'email' | 'password') => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setErrorMessage('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            setErrorMessage('All fields need to be filled!')
            return
        }

        try {
            await login(formData)
        } catch {
            setErrorMessage('Email o contraseña incorrectos')
        }
    }

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

                <PasswordInput
                    testId="password-input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                />
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
    )
}

export default Login
