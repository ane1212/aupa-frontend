import { useState } from 'react';
import PasswordInput from '../components/ui/PasswordInput';
import { CircleUser, Mail } from 'lucide-react';
import footer from '../assets/redfooter.png'
import TermsLink from '../components/ui/TermsLink';
import AuthLink from '../components/ui/AuthLink';
import { useNavigate } from 'react-router-dom';
import { authService, userService } from '../services/API';
import TopLogo from '../components/ui/TopLogo';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (field: keyof RegisterFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('All fields need to be filled!');
      return;
    }

    if (formData.name.length < 3) {
      setErrorMessage('You must enter a valid user name!');
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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Both passwords must match!')
      return;
    }

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordRepeat: formData.confirmPassword,
      });

      const { token } = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', token);
      const user = await userService.getProfile();
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      }));

      setErrorMessage('Logged in successfully');
      navigate('/home');
    } catch {
      setErrorMessage('Registration failed');
    }
  };

  return (
    <div className="register">
      <div className="register-header">
        <TopLogo />
        <h2>Create your account</h2>
        <span>Join Aupa! to save your favorite experience and trips</span>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>

        <div className="account-container">
          <CircleUser className="icon" size={21} color="currentColor" />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name')(e.target.value)}
            className="input-box"
            data-testid="name-input"
          />
        </div>

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
        <PasswordInput testId="confirm-password-input" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange('confirmPassword')} />
        <div className="error-message">{errorMessage}</div>
        <button type="submit" className="account-btn">Create an account</button>
        <AuthLink mainText="Already have an account?" linkTo="/login" linkText="Sign in!" />
      </form>

      <TermsLink />

      <img className="footer" src={footer} alt="footer" />
    </div>
  );
};


export default Register;