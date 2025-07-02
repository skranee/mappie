import { convertToKm, convertToMinutes } from '../convertMetrics';

describe('convertMetrics', () => {
  describe('convertToKm', () => {
    it('should convert meters to kilometers with 1 decimal place', () => {
      expect(convertToKm(1500)).toBe('1.5');
    });

    it('should return 0 for undefined input', () => {
      expect(convertToKm(undefined)).toBe(0);
    });

    it('should handle zero distance', () => {
      expect(convertToKm(0)).toBe(0);
    });
  });

  describe('convertToMinutes', () => {
    it('should convert seconds to minutes', () => {
      expect(convertToMinutes(300)).toBe(5);
    });

    it('should round to nearest minute', () => {
      expect(convertToMinutes(90)).toBe(2);
    });

    it('should return 0 for undefined input', () => {
      expect(convertToMinutes(undefined)).toBe(0);
    });
  });
});
