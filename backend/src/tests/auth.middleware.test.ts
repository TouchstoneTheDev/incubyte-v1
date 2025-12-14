import { Request, Response, NextFunction } from 'express';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import { AuthService } from '../services/AuthService';
import { UserRole } from '../entities/User';

// Mock the AuthService
jest.mock('../services/AuthService');

describe('Auth Middleware', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    nextFunction = jest.fn();
  });

  describe('authenticate', () => {
    it('should call next() for valid token', () => {
      // Arrange
      const mockDecoded = {
        userId: '123',
        email: 'test@example.com',
        role: UserRole.USER
      };
      mockRequest.headers = { authorization: 'Bearer valid-token' };
      (AuthService.verifyToken as jest.Mock).mockReturnValue(mockDecoded);

      // Act
      authenticate(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      // Assert
      expect(mockRequest.user).toEqual(mockDecoded);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should return 401 when no token provided', () => {
      // Arrange
      mockRequest.headers = {};

      // Act
      authenticate(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'No token provided' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 401 when token is invalid', () => {
      // Arrange
      mockRequest.headers = { authorization: 'Bearer invalid-token' };
      (AuthService.verifyToken as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act
      authenticate(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 401 when authorization header does not start with Bearer', () => {
      // Arrange
      mockRequest.headers = { authorization: 'Basic some-token' };

      // Act
      authenticate(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'No token provided' });
    });
  });

  describe('requireAdmin', () => {
    it('should call next() for admin user', () => {
      // Arrange
      mockRequest.user = {
        userId: '123',
        email: 'admin@example.com',
        role: UserRole.ADMIN
      };

      // Act
      requireAdmin(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      // Assert
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should return 403 for non-admin user', () => {
      // Arrange
      mockRequest.user = {
        userId: '123',
        email: 'user@example.com',
        role: UserRole.USER
      };

      // Act
      requireAdmin(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Admin access required' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 401 when no user in request', () => {
      // Arrange
      mockRequest.user = undefined;

      // Act
      requireAdmin(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });
});
