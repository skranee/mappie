import { convertError } from '../convertError';

describe('convertError', () => {
  it('should convert Firebase invalid credential error', () => {
    const error = 'Firebase: Error (auth/invalid-credential).';
    expect(convertError(error)).toBe('Неправильная почта или пароль');
  });

  it('should return original error for unknown errors', () => {
    const error = 'Some unknown error';
    expect(convertError(error)).toBe(error);
  });
});
