import { errorMessageAtom, loginAtom, passwordAtom } from '../atoms';
import { useAuth } from '@/shared/auth';
import { useThemeStyles } from '@/shared/theme';
import { VBanner } from '@/shared/ui/VBanner';
import { VButton } from '@/shared/ui/VButton';
import { VCard } from '@/shared/ui/VCard';
import { VTextInput } from '@/shared/ui/VTextInput';
import { useAtom } from 'jotai';
import { Navigate, useNavigate } from 'react-router-dom';

function getLoginError(value: string): string | null {
  if (!value) {
    return null;
  }
  if (!value.trim().includes('@') || !value.trim().includes('.')) {
    return 'Введите корректный email';
  }
  return null;
}

function getPasswordError(value: string): string | null {
  if (!value) {
    return null;
  }
  if (value.length < 8) {
    return 'Пароль должен содержать не менее 8 символов';
  }
  if (!/[A-Za-zА-Яа-яЁё]/.test(value) || !/\d/.test(value)) {
    return 'Пароль должен содержать буквы и цифры';
  }
  return null;
}

const RegistrationForm = () => {
  const styles = useThemeStyles();
  const navigate = useNavigate();

  const [login, setLogin] = useAtom(loginAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

  const { signUp, isLoading, isAuthenticated } = useAuth();

  const loginError = getLoginError(login);
  const passwordError = getPasswordError(password);
  const isValid = !loginError && !passwordError && Boolean(login.trim()) && Boolean(password);

  if (isAuthenticated) {
    return <Navigate to="/reports" replace />;
  }

  const handleSubmit = async () => {
    if (!isValid) {
      return;
    }

    try {
      await signUp({ login, password });
      navigate('/reports');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: styles.colors.bgPrimary,
      }}
    >
      <VCard
        style={{
          width: '360px',
          display: 'flex',
          flexDirection: 'column',
          gap: styles.spacing.l,
          padding: styles.spacing.xl,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: styles.typography.fontSize.xxl,
            fontWeight: styles.typography.fontWeight.bold,
            color: styles.colors.textPrimary,
            textAlign: 'center',
          }}
        >
          Регистрация
        </h1>

        <VBanner type="error" visible={Boolean(errorMessage)} message={errorMessage ?? ''} />

        <VTextInput
          label="Логин"
          value={login}
          onChange={setLogin}
          error={loginError ?? undefined}
          autoComplete="username"
        />

        <VTextInput
          label="Пароль"
          value={password}
          onChange={setPassword}
          error={passwordError ?? undefined}
          type="password"
          autoComplete="new-password"
        />

        <VButton
          variant="primary"
          onClick={handleSubmit}
          isDisabled={!isValid}
          isLoading={isLoading}
        >
          Зарегистрироваться
        </VButton>

        <VButton variant="secondary" onClick={() => navigate('/login')}>
          Вход
        </VButton>
      </VCard>
    </div>
  );
};

export default RegistrationForm;