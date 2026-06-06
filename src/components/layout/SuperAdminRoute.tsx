import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context';
import { UserRole } from '../../services/models';

const SuperAdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated || user?.role !== UserRole.SUPER_ADMIN) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return children;
};

export default SuperAdminRoute;
