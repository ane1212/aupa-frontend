import { Navigate, useLocation } from 'react-router-dom';

const AuthenticatedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default AuthenticatedRoute;