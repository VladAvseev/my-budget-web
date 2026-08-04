import { useState } from 'react';
import { useTheme, useThemeStyles } from '@/shared/theme';

export const TestLayout = () => {
  const { theme, setTheme } = useTheme();
  const styles = useThemeStyles();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: styles.colors.bg,
        color: styles.colors.text,
        padding: styles.spacing.m,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: styles.spacing.xs,
          padding: styles.spacing.m,
          backgroundColor: styles.colors.bgSecondary,
          borderRadius: styles.radius.m,
          boxShadow: styles.shadow.m,
        }}
      >
        <text style={{ fontSize: styles.typography.fontSize.l }}>Текущая тема: {theme}</text>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: styles.spacing.xs,
            borderRadius: styles.radius.m,
            fontSize: styles.typography.fontSize.m,
            backgroundColor: isHovered ? styles.colors.primaryHover : styles.colors.primary,
            border: 'none',
          }}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <text
            style={{
              fontSize: styles.typography.fontSize.s,
            }}
          >
            Переключить тему
          </text>
        </button>
      </div>
    </div>
  );
};
