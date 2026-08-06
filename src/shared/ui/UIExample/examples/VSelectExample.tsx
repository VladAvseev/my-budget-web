import { useState } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { VSelect } from '@/shared/ui/VSelect';

const CATEGORY_OPTIONS = [
  { value: 'food', label: 'Продукты' },
  { value: 'transport', label: 'Транспорт' },
  { value: 'entertainment', label: 'Развлечения' },
  { value: 'other', label: 'Другое' },
];

export const VSelectExample = () => {
  const styles = useThemeStyles();
  const [category, setCategory] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VSelect
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: styles.spacing.l,
        }}
      >
        <VSelect
          label="Категория"
          placeholder="Выберите категорию"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={setCategory}
        />
        <VSelect
          label="Категория (отключено)"
          placeholder="Выберите категорию"
          options={CATEGORY_OPTIONS}
          value="food"
          disabled
        />
        <VSelect
          label="Категория (с ошибкой)"
          placeholder="Выберите категорию"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={setCategory}
          error={!category ? 'Обязательное поле' : undefined}
        />
      </div>
    </div>
  );
};