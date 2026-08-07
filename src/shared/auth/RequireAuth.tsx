import { useAuth } from './useAuth';
import { useThemeStyles } from '@/shared/theme';
import { VLoader } from '@/shared/ui/VLoader';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const styles = useThemeStyles();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: styles.colors.bgPrimary,
        }}
      >
        <VLoader size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;