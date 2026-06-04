import { useState } from 'react';
import PasswordInput from '../components/ui/PasswordInput';
import { CircleUser, Mail } from 'lucide-react';
import footer from '../assets/redfooter.png'

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
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

  const handleSubmit = (e: React.SubmitEvent) => {
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

    setErrorMessage('Account created')
    // auth
  };


  return (
    <div className="register">
      <div className="register-header">
        <h2>Create your account</h2>
        <span>Join Aupa! to save your favorite experience and trips</span>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>

        <div className="username-container">
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
        <PasswordInput testId="confirm-password-input" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange('confirmPassword')} />
        <div className="error-message">{errorMessage}</div>
        <button type="submit" className="create-account-btn">Create an account</button>
        <span className="span-text">
          Already have an account? <br />
          <a href="/login" className="terms-link">Sign in!</a>
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


export default Register;