import styles from './Login.module.css';
import { Button } from '@/components/controls/Button/Button.tsx';
import { useAuth } from '@/hooks/useAuth.ts';

export const Login = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className={styles.login}>
      <div className={styles.login__form}>
        <Button version='blue' square={false} size='md'>
          Войти
        </Button>
        <Button version='red' square={false} size='md'>
          Зарегистрироваться
        </Button>
        <Button version='gray-light' square={false} size='md' onClick={signInWithGoogle}>
          Google Account
        </Button>
      </div>
    </div>
  );
};
