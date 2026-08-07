import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useBreakpoint } from '@/shared/hooks';
import { useThemeStyles } from '@/shared/theme';
import { VButton } from '@/shared/ui/VButton';
import { VCard } from '@/shared/ui/VCard';
import { authService } from '@/shared/supabase/services/auth';

interface AppLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { to: '/profile', label: 'Профиль' },
  { to: '/reports', label: 'Отчёты' },
  { to: '/example', label: 'Пример UI' },
];

const SidebarContent = () => {
  const styles = useThemeStyles();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authService.signOut();
    setIsSigningOut(false);
  };

  return (
    <>
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
    </>
  );
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const styles = useThemeStyles();
  const { isDesktop } = useBreakpoint();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isDesktop) {
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
            <SidebarContent />
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
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: styles.colors.bgPrimary,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: styles.spacing.m,
          padding: `${styles.spacing.m} ${styles.spacing.l}`,
          backgroundColor: styles.colors.bgSurface,
          borderBottom: `1px solid ${styles.colors.border}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: styles.typography.fontSize.l,
            fontWeight: styles.typography.fontWeight.bold,
            color: styles.colors.textPrimary,
          }}
        >
          Мой бюджет
        </div>
        <VButton variant="secondary" onClick={() => setIsMenuOpen(true)} style={{ padding: `${styles.spacing.xs} ${styles.spacing.s}` }}>
          Меню
        </VButton>
      </div>

      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
          }}
        >
          <div
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          />
          <VCard
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: styles.spacing.l,
              width: 280,
              maxWidth: '80%',
              height: '100%',
              borderRadius: 0,
              padding: styles.spacing.l,
            }}
          >
            <SidebarContent />
          </VCard>
        </div>
      )}

      <main
        style={{
          flex: 1,
          minHeight: 0,
          padding: styles.spacing.l,
          overflowY: 'auto',
        }}
      >
        {children}
      </main>
    </div>
  );
};