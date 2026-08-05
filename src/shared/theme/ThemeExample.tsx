import { useState, type ReactNode } from 'react';
import { useTheme, useThemeStyles } from './ThemeContext';

interface CardProps {
  title: string;
  children: ReactNode;
}

interface SwatchProps {
  label: string;
  value: string;
}

interface DemoButtonProps {
  label: string;
  bg: string;
  bgHover: string;
  fg: string;
  onClick?: () => void;
}

const DemoCard = ({ title, children }: CardProps) => {
  const styles = useThemeStyles();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: styles.spacing.m,
        padding: styles.spacing.l,
        backgroundColor: styles.colors.bgSecondary,
        borderRadius: styles.radius.m,
        boxShadow: styles.shadow.s,
      }}
    >
      <div style={{ fontSize: styles.typography.fontSize.l, fontWeight: styles.typography.fontWeight.bold }}>
        {title}
      </div>
      {children}
    </div>
  );
};

const DemoSwatch = ({ label, value }: SwatchProps) => {
  const styles = useThemeStyles();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: styles.spacing.xs,
        width: '96px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '40px',
          backgroundColor: value,
          borderRadius: styles.radius.s,
          border: `1px solid ${styles.colors.border}`,
        }}
      />
      <div style={{ fontSize: styles.typography.fontSize.s, color: styles.colors.textSecondary }}>{label}</div>
      <div style={{ fontSize: styles.typography.fontSize.s, color: styles.colors.textSecondary }}>{value}</div>
    </div>
  );
};

const DemoButton = ({ label, bg, bgHover, fg, onClick }: DemoButtonProps) => {
  const styles = useThemeStyles();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        padding: `${styles.spacing.s} ${styles.spacing.l}`,
        borderRadius: styles.radius.m,
        fontSize: styles.typography.fontSize.m,
        fontWeight: styles.typography.fontWeight.medium,
        backgroundColor: isHovered ? bgHover : bg,
        color: fg,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
};

export const ThemeExample = () => {
  const { theme, setTheme } = useTheme();
  const styles = useThemeStyles();

  const swapTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const colorEntries: [keyof typeof styles.colors, string][] = [
    ['bg', styles.colors.bg],
    ['bgSecondary', styles.colors.bgSecondary],
    ['text', styles.colors.text],
    ['textSecondary', styles.colors.textSecondary],
    ['primary', styles.colors.primary],
    ['primaryHover', styles.colors.primaryHover],
    ['border', styles.colors.border],
    ['error', styles.colors.error],
    ['errorBg', styles.colors.errorBg],
    ['warning', styles.colors.warning],
    ['warningBg', styles.colors.warningBg],
    ['success', styles.colors.success],
    ['successBg', styles.colors.successBg],
  ];

  const typographyEntries: [string, string][] = [
    ['s', styles.typography.fontSize.s],
    ['m', styles.typography.fontSize.m],
    ['l', styles.typography.fontSize.l],
    ['xl', styles.typography.fontSize.xl],
    ['xxl', styles.typography.fontSize.xxl],
  ];

  const fontWeightEntries: [string, number][] = [
    ['regular', styles.typography.fontWeight.regular],
    ['medium', styles.typography.fontWeight.medium],
    ['bold', styles.typography.fontWeight.bold],
  ];

  const radiusEntries: [string, string][] = [
    ['s', styles.radius.s],
    ['m', styles.radius.m],
    ['l', styles.radius.l],
    ['round', styles.radius.round],
  ];

  const shadowEntries: [string, string][] = [
    ['s', styles.shadow.s],
    ['m', styles.shadow.m],
    ['l', styles.shadow.l],
  ];

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: styles.spacing.xl,
        padding: styles.spacing.xl,
        boxSizing: 'border-box',
        backgroundColor: styles.colors.bg,
        color: styles.colors.text,
      }}
    >
      <div style={{ width: '100%' }}>
        <DemoCard title={`Текущая тема: ${theme}`}>
          <DemoButton
            label={theme === 'light' ? 'Переключить на тёмную' : 'Переключить на светлую'}
            bg={styles.colors.primary}
            bgHover={styles.colors.primaryHover}
            fg={styles.colors.bg}
            onClick={swapTheme}
          />
        </DemoCard>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: styles.spacing.xl,
        }}
      >
        <DemoCard title="Цвета">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: styles.spacing.m,
          }}
        >
          {colorEntries.map(([name, value]) => (
            <DemoSwatch key={name} label={name} value={value} />
          ))}
        </div>
      </DemoCard>

      <DemoCard title="Типографика">
        <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.s }}>
          <div style={{ fontSize: styles.typography.fontSize.s, color: styles.colors.textSecondary }}>Размер шрифта</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: styles.spacing.xs,
            }}
          >
            {typographyEntries.map(([name, value]) => (
              <div
                key={name}
                style={{
                  fontSize: value,
                  lineHeight: styles.typography.lineHeight.normal,
                }}
              >
                {name} — {value}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.s }}>
          <div style={{ fontSize: styles.typography.fontSize.s, color: styles.colors.textSecondary }}>Начертание</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: styles.spacing.xs,
            }}
          >
            {fontWeightEntries.map(([name, value]) => (
              <div
                key={name}
                style={{
                  fontSize: styles.typography.fontSize.l,
                  fontWeight: value,
                }}
              >
                {name} ({value})
              </div>
            ))}
          </div>
        </div>
      </DemoCard>

      <DemoCard title="Радиусы и тени">
        <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.s }}>
          <div style={{ fontSize: styles.typography.fontSize.s, color: styles.colors.textSecondary }}>Радиусы</div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: styles.spacing.m,
            }}
          >
            {radiusEntries.map(([name, value]) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: styles.spacing.xs,
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: styles.colors.primary,
                    borderRadius: value,
                  }}
                />
                <span style={{ fontSize: styles.typography.fontSize.s, color: styles.colors.textSecondary }}>
                  {name} ({value})
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.s }}>
          <div style={{ fontSize: styles.typography.fontSize.s, color: styles.colors.textSecondary }}>Тени</div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: styles.spacing.m,
            }}
          >
          {shadowEntries.map(([name, value]) => (
            <div
              key={name}
              style={{
                width: '96px',
                height: '56px',
                backgroundColor: styles.colors.bgSecondary,
                borderRadius: styles.radius.m,
                boxShadow: value,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: styles.typography.fontSize.s,
              }}
            >
              {name}
            </div>
          ))}
        </div>
        </div>
      </DemoCard>

      <DemoCard title="Кнопки-состояния">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: styles.spacing.m,
          }}
        >
          <DemoButton label="Primary" bg={styles.colors.primary} bgHover={styles.colors.primaryHover} fg={styles.colors.bg} />
          <DemoButton label="Error" bg={styles.colors.error} bgHover={styles.colors.errorBg} fg={styles.colors.bg} />
          <DemoButton label="Warning" bg={styles.colors.warning} bgHover={styles.colors.warningBg} fg={styles.colors.bg} />
          <DemoButton label="Success" bg={styles.colors.success} bgHover={styles.colors.successBg} fg={styles.colors.bg} />
        </div>
      </DemoCard>
      </div>
    </div>
  );
};