import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="register">
      <div className="register-header">
        <h1>Create your account</h1>
        <p>Join Aupa! to save your favorite experience and trips</p>
      </div>

      <form className="register-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-box"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-box"
        />

        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-box"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="eye-icon"
          >
            {showPassword ? (
              <Eye size={24} color="currentColor" />
            ) : (
              <EyeOff size={24} color="currentColor" />
            )}
          </button>
        </div>

        <div className="password-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-box"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="eye-icon"
          >
            {showConfirmPassword ? (
              <Eye size={24} color="currentColor" />
            ) : (
              <EyeOff size={24} color="currentColor" />
            )}
          </button>
        </div>

        <button type="submit" className="create-account-btn">
          Create an account
        </button>
      </form>

      <p className="terms-text">
        By creating an account, you agree to the{' '}
        <a href="/terms" className="terms-link">Terms of Service</a> and{' '}
        <a href="/privacy" className="terms-link">Privacy Policy</a>
      </p>
    </div>
  );
};

export default Register;