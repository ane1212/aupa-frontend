import React from 'react';
import { Link } from 'react-router-dom';

interface RegisterLinkProps {
  mainText: string;
  linkTo: string;
  linkText: string;
}

export const AuthLink: React.FC<RegisterLinkProps> = ({
  mainText,
  linkTo,
  linkText,
}) => {
  return (
    <span className="span-text">
      {mainText} <br />
      <Link to={linkTo} className="terms-link">
        {linkText}
      </Link>
    </span>
  );
};

export default AuthLink;