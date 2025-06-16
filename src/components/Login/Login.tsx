import styles from './Login.module.css';
import { Button } from '@/components/controls/Button/Button.tsx';
import { useAuth } from '@/hooks/useAuth.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { setSignMode } from '@/store/slices/AuthSlice.ts';
import { type FormEvent, useState } from 'react';
import { Input } from '@/components/controls/Input/Input.tsx';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from '@/assets/icons/arrow-left.svg';

export const Login = () => {
  const signMode = useAppSelector(state => state.auth.signMode);

  const dispatch = useAppDispatch();
  const { signInWithGoogle, signInWithPassword, signUpWithPassword } = useAuth();

  const navigate = useNavigate();

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

  const goBack = () => {
    if (signMode) {
      dispatch(setSignMode(undefined));
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__back}>
        <Button version='gray-light' square={true} size='md' onClick={goBack}>
          <img src={ArrowLeft} alt='arrow-left' />
        </Button>
      </div>
      {!signMode && (
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
      )}
      {signMode && (
        <form onSubmit={e => signIn(e)} className={styles.login__signContainer}>
          {signMode === 'signIn' && (
            <>
              <Input
                label='Почта'
                version='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                label='Пароль'
                version='text'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button version='gray-light' square={false} size='sm' onClick={signIn}>
                Войти
              </Button>
            </>
          )}
          {signMode === 'signUp' && (
            <>
              <Input
                label='Почта'
                version='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                label='Пароль'
                version='text'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Input
                label='Повторите пароль'
                version='text'
                value={confirmedPassword}
                type='password'
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <Button version='gray-light' square={false} size='sm' onClick={signUp}>
                Зарегистрироваться
              </Button>
            </>
          )}
        </form>
      )}
    </div>
  );
};
