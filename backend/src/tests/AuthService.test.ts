import { AuthService } from '../services/AuthService';

describe('AuthService', () => {
  describe('hashPassword', () => {
    it('should hash a password successfully', async () => {
      // Arrange
      const password = 'testPassword123';

      // Act
      const hashedPassword = await AuthService.hashPassword(password);

      // Assert
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(0);
    });

    it('should generate different hashes for the same password', async () => {
      // Arrange
      const password = 'testPassword123';

      // Act
      const hash1 = await AuthService.hashPassword(password);
      const hash2 = await AuthService.hashPassword(password);

      // Assert
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('comparePasswords', () => {
    it('should return true for matching passwords', async () => {
      // Arrange
      const password = 'testPassword123';
      const hashedPassword = await AuthService.hashPassword(password);

      // Act
      const result = await AuthService.comparePasswords(password, hashedPassword);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      // Arrange
      const password = 'testPassword123';
      const wrongPassword = 'wrongPassword456';
      const hashedPassword = await AuthService.hashPassword(password);

      // Act
      const result = await AuthService.comparePasswords(wrongPassword, hashedPassword);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      // Arrange
      const userId = '123';
      const email = 'test@example.com';
      const role = 'user';

      // Act
      const token = AuthService.generateToken(userId, email, role);

      // Assert
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should include user data in token payload', () => {
      // Arrange
      const userId = '123';
      const email = 'test@example.com';
      const role = 'admin';

      // Act
      const token = AuthService.generateToken(userId, email, role);
      const decoded = AuthService.verifyToken(token);

      // Assert
      expect(decoded.userId).toBe(userId);
      expect(decoded.email).toBe(email);
      expect(decoded.role).toBe(role);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      // Arrange
      const userId = '123';
      const email = 'test@example.com';
      const role = 'user';
      const token = AuthService.generateToken(userId, email, role);

      // Act
      const decoded = AuthService.verifyToken(token);

      // Assert
      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(userId);
      expect(decoded.email).toBe(email);
    });

    it('should throw error for invalid token', () => {
      // Arrange
      const invalidToken = 'invalid.token.here';

      // Act & Assert
      expect(() => AuthService.verifyToken(invalidToken)).toThrow('Invalid token');
    });
  });
});
