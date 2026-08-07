import { errorMessageAtom, loginAtom, passwordAtom } from '../atoms';
import { useAuth } from '@/shared/auth';
import { useThemeStyles } from '@/shared/theme';
import { VBanner } from '@/shared/ui/VBanner';
import { VButton } from '@/shared/ui/VButton';
import { VCard } from '@/shared/ui/VCard';
import { VTextInput } from '@/shared/ui/VTextInput';
import { useAtom } from 'jotai';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const styles = useThemeStyles();
  const navigate = useNavigate();

  const [login, setLogin] = useAtom(loginAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

  const { signIn, isLoading, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/reports" replace />;
  }

  const isInvalid = !login.trim() || !password;

  const handleSubmit = async () => {
    if (isInvalid) {
      return;
    }

    try {
      await signIn({ login, password });
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
          Авторизация
        </h1>

        <VBanner type="error" visible={Boolean(errorMessage)} message={errorMessage ?? ''} />

        <VTextInput
          label="Логин"
          value={login}
          onChange={setLogin}
          autoComplete="username"
        />

        <VTextInput
          label="Пароль"
          value={password}
          onChange={setPassword}
          type="password"
          autoComplete="current-password"
        />

        <VButton
          variant="primary"
          onClick={handleSubmit}
          isDisabled={isInvalid}
          isLoading={isLoading}
        >
          Войти
        </VButton>

        <VButton variant="secondary" onClick={() => navigate('/registration')}>
          Регистрация
        </VButton>
      </VCard>
    </div>
  );
};

export default LoginForm;