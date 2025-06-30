export const convertError = (error: string) => {
  switch (error) {
    case 'Firebase: Error (auth/invalid-credential).':
      return 'Неправильная почта или пароль';
    default:
      return error;
  }
};
