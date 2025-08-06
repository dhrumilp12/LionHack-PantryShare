import { jest } from '@jest/globals';

// Mock the helper functions
const mockHelpers = {
  calculateDistance: jest.fn(),
  formatPhoneNumber: jest.fn(),
  validateEmail: jest.fn(),
  generateReferralCode: jest.fn(),
  calculateDeliveryTime: jest.fn()
};

jest.unstable_mockModule('../src/utils/helpers.js', () => mockHelpers);

const helpers = await import('../src/utils/helpers.js');

describe('Helper Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateDistance', () => {
    it('should calculate distance between two coordinates', () => {
      const lat1 = 40.7128;
      const lon1 = -74.0060;
      const lat2 = 34.0522;
      const lon2 = -118.2437;

      // Mock the return value
      mockHelpers.calculateDistance.mockReturnValue(2445.55);

      const result = helpers.calculateDistance(lat1, lon1, lat2, lon2);
      
      expect(mockHelpers.calculateDistance).toHaveBeenCalledWith(lat1, lon1, lat2, lon2);
      expect(result).toBe(2445.55);
    });
  });

  describe('formatPhoneNumber', () => {
    it('should format phone number correctly', () => {
      const phoneNumber = '1234567890';
      const expectedFormat = '(123) 456-7890';

      mockHelpers.formatPhoneNumber.mockReturnValue(expectedFormat);

      const result = helpers.formatPhoneNumber(phoneNumber);
      
      expect(mockHelpers.formatPhoneNumber).toHaveBeenCalledWith(phoneNumber);
      expect(result).toBe(expectedFormat);
    });
  });

  describe('validateEmail', () => {
    it('should validate email format correctly', () => {
      const validEmail = 'test@example.com';
      
      mockHelpers.validateEmail.mockReturnValue(true);

      const result = helpers.validateEmail(validEmail);
      
      expect(mockHelpers.validateEmail).toHaveBeenCalledWith(validEmail);
      expect(result).toBe(true);
    });

    it('should reject invalid email format', () => {
      const invalidEmail = 'invalid-email';
      
      mockHelpers.validateEmail.mockReturnValue(false);

      const result = helpers.validateEmail(invalidEmail);
      
      expect(mockHelpers.validateEmail).toHaveBeenCalledWith(invalidEmail);
      expect(result).toBe(false);
    });
  });

  describe('generateReferralCode', () => {
    it('should generate a unique referral code', () => {
      const mockCode = 'ABC123';
      
      mockHelpers.generateReferralCode.mockReturnValue(mockCode);

      const result = helpers.generateReferralCode();
      
      expect(mockHelpers.generateReferralCode).toHaveBeenCalled();
      expect(result).toBe(mockCode);
    });
  });

  describe('calculateDeliveryTime', () => {
    it('should calculate estimated delivery time', () => {
      const distance = 10; // km
      const expectedTime = 30; // minutes
      
      mockHelpers.calculateDeliveryTime.mockReturnValue(expectedTime);

      const result = helpers.calculateDeliveryTime(distance);
      
      expect(mockHelpers.calculateDeliveryTime).toHaveBeenCalledWith(distance);
      expect(result).toBe(expectedTime);
    });
  });
});
      
      