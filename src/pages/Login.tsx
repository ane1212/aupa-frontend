import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, User } from 'lucide-react';
import Google from '../assets/web_neutral_rd_na.svg';
import footer from '../assets/redfooter.png'
import logo from '../assets/logo-trimmed.png'
import AuthLink from '../components/ui/AuthLink';
import EmailLoginForm from '../components/ui/EmailLoginForm';
import TermsLink from '../components/ui/TermsLink';

type LoginMode = 'choices' | 'email';

const Login: React.FC = () => {
  const [mode, setMode] = useState<LoginMode>('choices');

  if (mode === 'email') {
    return <EmailLoginForm onBack={() => setMode('choices')} />;
  }

  return (
    <div className="register login">
      <div className="register-header">
        <img className="logo" src={logo} alt="Logo" /><br />
        <span className='span-text'>Visit <span className='txt-red'>Eu</span><span className='txt-green'>ska</span><span className='txt-red'>di</span> lika a local!</span>
      </div>

      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <div className="account-container">
          <button type="button" className="account-btn login-type">
            <img src={Google} alt="Google logo" className="login-icon" />
            Continue with Google
          </button>
        </div>

        <div className="account-container">
          <button type="button" className="account-btn login-type" onClick={() => setMode('email')} >
            <Mail size={21} />
            Continue with Email
          </button>
        </div>

        <div className="account-container">
          <Link to="/home" className="account-btn login-type">
            <User size={21} />
            Continue as Guest
          </Link>
        </div>

        <AuthLink mainText="Don't have an account?" linkTo="/register" linkText="Register here!" />
        <TermsLink />
      </form>

      <img className="footer" src={footer} alt="footer" />
    </div>
  );
};

export default Login;