import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ValidationError } from 'yup';

import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { Button } from '@/components/controls/Button/Button.tsx';
import { Input } from '@/components/controls/Input/Input.tsx';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { useAuth } from '@/hooks/useAuth.ts';
import { setSignMode } from '@/store/slices/AuthSlice.ts';
import { convertError } from '@/utils/convertError.ts';
import { getValidationSchema } from '@/utils/getValidationSchema.ts';

import styles from './Login.module.css';

type SignMode = 'signIn' | 'signUp' | undefined;

export const Login = () => {
  const signMode = useAppSelector(state => state.auth.signMode) as SignMode;
  const dispatch = useAppDispatch();
  const { signInWithGoogle, signInWithPassword, signUpWithPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loginError, setLoginError] = useState('');

  const validateField = async (fieldName: string, value: string) => {
    const schema = getValidationSchema(signMode);
    try {
      await schema.validateAt(fieldName, { [fieldName]: value });
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    } catch (err) {
      if (err instanceof Error) {
        setErrors(prev => ({ ...prev, [fieldName]: err.message }));
      }
    }
  };

  const validateForm = async () => {
    const schema = getValidationSchema(signMode);
    try {
      await schema.validate({ email, password, confirmPassword }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: unknown) {
      const errs: { [key: string]: string } = {};
      if ((err as ValidationError).inner) {
        (err as ValidationError).inner.forEach((e: ValidationError) => {
          if (e.path) errs[e.path] = e.message;
        });
      }
      setErrors(errs);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    if (signMode === 'signIn') {
      try {
        await signInWithPassword(email, password);
      } catch (error: unknown) {
        setLoginError((error as Error).message);
      }
    } else if (signMode === 'signUp') {
      try {
        await signUpWithPassword(email, password);
      } catch (error: unknown) {
        setLoginError((error as Error).message);
      }
    }
  };

  const handleBlur = (fieldName: string, value: string) => {
    validateField(fieldName, value);
  };

  const goBack = () => {
    if (signMode) dispatch(setSignMode(undefined));
    else navigate('/');
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__back}>
        <Button version='gray-light' square size='md' onClick={goBack}>
          <img src={ArrowLeft} alt='back' />
        </Button>
      </div>

      {!signMode && (
        <div className={styles.login__form}>
          <Button
            version='blue'
            square={false}
            size='md'
            onClick={() => dispatch(setSignMode('signIn'))}
          >
            Войти
          </Button>
          <Button
            version='red'
            square={false}
            size='md'
            onClick={() => dispatch(setSignMode('signUp'))}
          >
            Зарегистрироваться
          </Button>
          <Button version='gray-light' square={false} size='md' onClick={signInWithGoogle}>
            Google Account
          </Button>
        </div>
      )}

      {signMode && (
        <form className={styles.login__signContainer} onSubmit={handleSubmit} noValidate>
          <Input
            label='Почта'
            version='text'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => handleBlur('email', email)}
            error={errors.email}
          />

          <Input
            label='Пароль'
            version='text'
            type='password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={() => handleBlur('password', password)}
            error={errors.password}
          />

          {signMode === 'signUp' && (
            <Input
              label='Повторите пароль'
              version='text'
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur('confirmPassword', confirmPassword)}
              error={errors.confirmPassword}
            />
          )}

          <Button type='submit' square={false} version='gray-light' size='sm'>
            {signMode === 'signIn' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          {loginError && <p className={styles.login__error}>{convertError(loginError)}</p>}
        </form>
      )}
    </div>
  );
};
