import React from 'react';
import { Link } from 'react-router-dom';

export const TermsLink: React.FC = () => {
  return (
    <span className="span-text">
      By creating an account, you agree to the{' '}
      <Link to="/terms" className="terms-link">Terms of Service</Link> &{' '}
      <Link to="/privacy" className="terms-link">Privacy Policy</Link>
    </span>
  );
};

export default TermsLink;