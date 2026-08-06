import { useState } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { VTextInput } from '@/shared/ui/VTextInput';

export const VTextInputExample = () => {
  const styles = useThemeStyles();
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VTextInput
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: styles.spacing.l,
        }}
      >
        <VTextInput label="Название" placeholder="Например, Продукты" value={text} onChange={setText} />
        <VTextInput label="Сумма" placeholder="0.00" numeric value={amount} onChange={setAmount} />
        <VTextInput
          label="Email"
          placeholder="user@example.com"
          value={email}
          onChange={setEmail}
          error={email && !email.includes('@') ? 'Некорректный email' : undefined}
        />
        <VTextInput label="Отключено" value="Недоступно" disabled />
      </div>
    </div>
  );
};