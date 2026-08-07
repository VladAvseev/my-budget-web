import { authService } from '@/shared/supabase/services/auth';
import { useThemeStyles } from '@/shared/theme';
import { VButton } from '@/shared/ui/VButton';
import { VCard } from '@/shared/ui/VCard';
import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface AppLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { to: '/profile', label: 'Профиль' },
  { to: '/reports', label: 'Отчёты' },
  { to: '/example', label: 'Пример UI' },
];

export const AppLayout = ({ children }: AppLayoutProps) => {
  const styles = useThemeStyles();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authService.signOut();
    setIsSigningOut(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: styles.colors.bgPrimary,
      }}
    >
      <div
        style={{
          width: 240,
          flexShrink: 0,
          alignSelf: 'stretch',
          padding: styles.spacing.l,
          paddingRight: 0,
        }}
      >
        <VCard
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: styles.spacing.l,
            padding: styles.spacing.l,
            height: '100%',
          }}
        >
          <div
            style={{
              padding: styles.spacing.m,
              borderRadius: styles.radius.m,
              backgroundColor: styles.colors.accentLight,
              color: styles.colors.accent,
              fontSize: styles.typography.fontSize.l,
              fontWeight: styles.typography.fontWeight.bold,
              textAlign: 'center',
            }}
          >
            Баланс: 0
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.xs }}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onMouseEnter={() => setHoveredItem(item.to)}
                onMouseLeave={() => setHoveredItem(null)}
                style={({ isActive }) => ({
                  padding: `${styles.spacing.s} ${styles.spacing.m}`,
                  borderRadius: styles.radius.m,
                  textDecoration: 'none',
                  fontSize: styles.typography.fontSize.m,
                  fontWeight: styles.typography.fontWeight.medium,
                  color: isActive
                    ? styles.colors.accent
                    : hoveredItem === item.to
                      ? styles.colors.accent
                      : styles.colors.textSecondary,
                  backgroundColor: isActive
                    ? styles.colors.accentLight
                    : hoveredItem === item.to
                      ? styles.colors.accentLight
                      : 'transparent',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div style={{ marginTop: 'auto' }}>
            <VButton
              variant="secondary"
              isDisabled={isSigningOut}
              isLoading={isSigningOut}
              onClick={handleSignOut}
              style={{ width: '100%' }}
            >
              Выйти
            </VButton>
          </div>
        </VCard>
      </div>

      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: styles.spacing.xl,
          overflowY: 'auto',
        }}
      >
        {children}
      </main>
    </div>
  );
};
