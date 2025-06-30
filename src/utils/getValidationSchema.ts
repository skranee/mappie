import * as Yup from 'yup';

type SignMode = 'signIn' | 'signUp' | undefined;

export const getValidationSchema = (signMode: SignMode) =>
  Yup.object({
    email: Yup.string().email('Неверный формат email').required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Минимум 6 символов')
      .max(15, 'Максимум 15 символов')
      .matches(/[0-9]/, 'Минимум одна цифра')
      .required('Обязательное поле'),
    confirmPassword:
      signMode === 'signUp'
        ? Yup.string()
            .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
            .required('Обязательное поле')
        : Yup.mixed().notRequired(),
  });
