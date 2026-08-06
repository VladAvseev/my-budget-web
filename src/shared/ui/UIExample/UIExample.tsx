import { useTheme, useThemeStyles } from '@/shared/theme';
import { VButton } from '@/shared/ui/VButton';
import { VCard } from '@/shared/ui/VCard';
import { VDatePickerExample } from '@/shared/ui/UIExample/examples/VDatePickerExample';
import { VButtonExample } from '@/shared/ui/UIExample/examples/VButtonExample';
import { VCardExample } from '@/shared/ui/UIExample/examples/VCardExample';
import { VLoaderExample } from '@/shared/ui/UIExample/examples/VLoaderExample';
import { VSelectExample } from '@/shared/ui/UIExample/examples/VSelectExample';
import { VTextInputExample } from '@/shared/ui/UIExample/examples/VTextInputExample';
import { VBannersExample } from '@/shared/ui/UIExample/examples/VBannersExample';
import { VModalExample } from '@/shared/ui/UIExample/examples/VModalExample';
import { VConfirmModalExample } from '@/shared/ui/UIExample/examples/VConfirmModalExample';

export const UIExample = () => {
  const { theme, setTheme } = useTheme();
  const styles = useThemeStyles();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: styles.spacing.xl,
        padding: styles.spacing.xl,
        backgroundColor: styles.colors.bgPrimary,
        color: styles.colors.textPrimary,
      }}
    >
      <VCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.l }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: styles.typography.fontSize.xl,
                fontWeight: styles.typography.fontWeight.bold,
              }}
            >
              Компоненты UI
            </div>
            <VButton onClick={toggleTheme}>
              {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
            </VButton>
          </div>

          <VLoaderExample />
          <VButtonExample />
          <VTextInputExample />
          <VSelectExample />
          <VDatePickerExample />
          <VCardExample />
          <VBannersExample />
          <VModalExample />
          <VConfirmModalExample />
        </div>
      </VCard>
    </div>
  );
};
