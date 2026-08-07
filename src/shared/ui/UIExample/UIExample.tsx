import { useTheme, useThemeStyles } from '@/shared/theme';
import { VAccordionExample } from '@/shared/ui/UIExample/examples/VAccordionExample';
import { VBadgeExample } from '@/shared/ui/UIExample/examples/VBadgeExample';
import { VBannerExample } from '@/shared/ui/UIExample/examples/VBannerExample';
import { VButtonExample } from '@/shared/ui/UIExample/examples/VButtonExample';
import { VConfirmModalExample } from '@/shared/ui/UIExample/examples/VConfirmModalExample';
import { VDatePickerExample } from '@/shared/ui/UIExample/examples/VDatePickerExample';
import { VLoaderExample } from '@/shared/ui/UIExample/examples/VLoaderExample';
import { VModalExample } from '@/shared/ui/UIExample/examples/VModalExample';
import { VSelectExample } from '@/shared/ui/UIExample/examples/VSelectExample';
import { VTextInputExample } from '@/shared/ui/UIExample/examples/VTextInputExample';
import { VToggleExample } from '@/shared/ui/UIExample/examples/VToggleExample';
import { VButton } from '@/shared/ui/VButton';
import { VCard } from '@/shared/ui/VCard';
import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
  const styles = useThemeStyles();

  return (
    <VCard>
      <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.l }}>
        <div
          style={{
            fontSize: styles.typography.fontSize.s,
            fontWeight: styles.typography.fontWeight.bold,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: styles.colors.textSecondary,
          }}
        >
          {title}
        </div>
        {children}
      </div>
    </VCard>
  );
};

export const UIExample = () => {
  const { theme, setTheme } = useTheme();
  const styles = useThemeStyles();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: styles.colors.bgPrimary,
        color: styles.colors.textPrimary,
      }}
    >
      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: styles.spacing.xl,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: styles.spacing.l,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.xs }}>
            <div
              style={{
                fontSize: styles.typography.fontSize.xxl,
                fontWeight: styles.typography.fontWeight.bold,
              }}
            >
              Компоненты UI
            </div>
            <div
              style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}
            >
              Демонстрация библиотеки компонентов
            </div>
          </div>
          <VButton variant="secondary" onClick={toggleTheme}>
            {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          </VButton>
        </div>

        <Section title="Вводы">
          <VTextInputExample />
          <VSelectExample />
          <VDatePickerExample />
        </Section>

        <Section title="Действия">
          <VButtonExample />
          <VToggleExample />
          <VLoaderExample />
        </Section>

        <Section title="Отображение">
          <VBadgeExample />
          <VAccordionExample />
        </Section>

        <Section title="Баннеры и окна">
          <VBannerExample />
          <VModalExample />
          <VConfirmModalExample />
        </Section>
      </div>
    </div>
  );
};
