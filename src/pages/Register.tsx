import { useState } from 'react';
import PasswordInput from '../components/ui/PasswordInput';
import { CircleUser, Mail } from 'lucide-react';

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

  const handleInputChange = (field: keyof RegisterFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    //auth
  };

  return (
    <div className="register">
      <div className="register-header">
        <h2>Create your account</h2>
        <p>Join Aupa! to save your favorite experience and trips</p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>

        <div className="username-container">
          <CircleUser size={24} color="currentColor" />
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
          <Mail size={24} color="currentColor" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email')(e.target.value)}
            className="input-box"
            data-testid="email-input"
          />
        </div>

        <PasswordInput testId="password-input" placeholder="Password" value={formData.password} onChange={handleInputChange('password')} />
        <PasswordInput testId="confirm-password-input" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange('confirmPassword')} />

        <button type="submit" className="create-account-btn">Create an account</button>
      </form>

      <span className="terms-text">
        By creating an account, you agree to the{' '}
        <a href="/terms" className="terms-link">Terms of Service</a> and{' '}
        <a href="/privacy" className="terms-link">Privacy Policy</a>
      </span>
    </div>
  );
};

export default Register;