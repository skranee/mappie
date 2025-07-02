import type { ValidationError } from 'yup';
import * as Yup from 'yup';

import { getValidationSchema } from '../getValidationSchema';

describe('getValidationSchema', () => {
  describe('signIn mode', () => {
    let schema: Yup.ObjectSchema<object>;

    beforeAll(() => {
      schema = getValidationSchema('signIn');
    });

    it('should validate email correctly', async () => {
      await expect(schema.validateAt('email', { email: 'test@example.com' })).resolves.toBeTruthy();
      await expect(schema.validateAt('email', { email: 'invalid' })).rejects.toThrow();
      await expect(schema.validateAt('email', { email: '' })).rejects.toThrow();
    });

    it('should validate password requirements', async () => {
      const validations = [
        { value: 'valid123', valid: true },
        { value: 'short', error: 'Минимум 6 символов' },
        { value: 'toolongpassword12345', error: 'Максимум 15 символов' },
        { value: 'noNumbers', error: 'Минимум одна цифра' },
        { value: '', error: 'required' },
      ];

      for (const test of validations) {
        if (test.valid) {
          await expect(
            schema.validateAt('password', { password: test.value })
          ).resolves.toBeTruthy();
        } else {
          await expect(schema.validateAt('password', { password: test.value })).rejects.toThrow();
        }
      }
    });

    it('should not validate confirmPassword', async () => {
      await expect(
        schema.validateAt('confirmPassword', { confirmPassword: undefined })
      ).resolves.toBeUndefined();
    });
  });

  describe('signUp mode', () => {
    let schema: Yup.ObjectSchema<object>;

    beforeAll(() => {
      schema = getValidationSchema('signUp');
    });

    it('should validate confirmPassword matching', async () => {
      await expect(
        schema.validate({
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        })
      ).resolves.toBeTruthy();

      await expect(
        schema.validate({
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'different',
        })
      ).rejects.toThrow();
    });

    it('should validate all required fields', async () => {
      try {
        await schema.validate({});
        fail('Validation should have failed');
      } catch (err) {
        expect((err as ValidationError).errors.length).toBeGreaterThan(0);
      }
    });

    it('should validate empty confirmPassword', async () => {
      try {
        await schema.validate({
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: '',
        });
        fail('Validation should have failed');
      } catch (err) {
        expect((err as ValidationError).errors.length).toBeGreaterThan(0);
      }
    });
  });
});
