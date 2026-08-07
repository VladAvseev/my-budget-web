import { useAuth } from '@/shared/auth';
import { useThemeStyles } from '@/shared/theme';
import { VBadge } from '@/shared/ui/VBadge';
import { VButton } from '@/shared/ui/VButton';
import { VCard } from '@/shared/ui/VCard';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
  const styles = useThemeStyles();
  const navigate = useNavigate();
  const { authUser, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: styles.colors.bgPrimary,
        padding: styles.spacing.l,
        gap: styles.spacing.l,
      }}
    >
      <VCard
        style={{
          width: '200px',
          display: 'flex',
          flexDirection: 'column',
          gap: styles.spacing.l,
          padding: styles.spacing.m,
        }}
      >
        <VBadge variant="accent" style={{ justifyContent: 'center', padding: styles.spacing.s }}>
          {authUser?.email}
        </VBadge>

        <VBadge variant="neutral" style={{ justifyContent: 'center' }}>
          Баланс: 0
        </VBadge>

        <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
          <Link
            to={'/profile'}
            style={{ textDecoration: 'none', color: styles.colors.textPrimary }}
          >
            Профиль
          </Link>
          <Link
            to={'/reports'}
            style={{ textDecoration: 'none', color: styles.colors.textPrimary }}
          >
            Отчёты
          </Link>
        </div>

        <VButton variant="danger" style={{ marginTop: 'auto' }} onClick={handleLogout}>
          Выход
        </VButton>
      </VCard>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;