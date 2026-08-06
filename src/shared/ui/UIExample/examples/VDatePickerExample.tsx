import { useState } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { VDatePicker } from '@/shared/ui/VDatePicker';

export const VDatePickerExample = () => {
  const styles = useThemeStyles();
  const [date, setDate] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VDatePicker
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: styles.spacing.l,
        }}
      >
        <VDatePicker label="Дата операции" value={date} onChange={setDate} />
        <VDatePicker label="Отключено" value="2026-08-06" disabled />
        <VDatePicker
          label="Дата"
          value={date}
          onChange={setDate}
          error={!date ? 'Обязательное поле' : undefined}
        />
      </div>
    </div>
  );
};