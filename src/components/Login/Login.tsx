import styles from './Login.module.css';
import { Button } from '@/components/controls/Button/Button.tsx';
import { useAuth } from '@/hooks/useAuth.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { setSignMode } from '@/store/slices/AuthSlice.ts';
import { type FormEvent, useState } from 'react';
import { Input } from '@/components/controls/Input/Input.tsx';

export const Login = () => {
  const signMode = useAppSelector(state => state.auth.signMode);

  const dispatch = useAppDispatch();
  const { signInWithGoogle, signInWithPassword, signUpWithPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmPassword] = useState('');

  const setSignInMode = () => {
    dispatch(setSignMode('signIn'));
  };

  const setSignUpMode = () => {
    dispatch(setSignMode('signUp'));
  };

  const signIn = (event: FormEvent) => {
    event.preventDefault();
    signInWithPassword(email, password);
  };

  const signUp = (event: FormEvent) => {
    if (password !== confirmedPassword) {
      return;
    }

    event.preventDefault();
    signUpWithPassword(email, password);
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__form}>
        <Button version='blue' square={false} size='md' onClick={setSignInMode}>
          Войти
        </Button>
        <Button version='red' square={false} size='md' onClick={setSignUpMode}>
          Зарегистрироваться
        </Button>
        <Button version='gray-light' square={false} size='md' onClick={signInWithGoogle}>
          Google Account
        </Button>
      </div>
      <form onSubmit={e => signIn(e)} className={styles.login__signContainer}>
        {signMode === 'signIn' && signMode ? (
          <>
            <Input version='text' value={email} onChange={e => setEmail(e.target.value)} />
            <Input version='text' value={password} onChange={e => setPassword(e.target.value)} />
            <Button version='gray-light' square={false} size='sm' onClick={signIn}>
              Войти
            </Button>
          </>
        ) : (
          <>
            <Input version='text' value={email} onChange={e => setEmail(e.target.value)} />
            <Input version='text' value={password} onChange={e => setPassword(e.target.value)} />
            <Input
              version='text'
              value={confirmedPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <Button version='gray-light' square={false} size='sm' onClick={signUp}>
              Зарегистрироваться
            </Button>
          </>
        )}
      </form>
    </div>
  );
};
