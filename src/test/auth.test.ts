import { AuthController } from '../infrastructure/http/controllers/AuthController';
import { Request, Response } from 'express';
import { RegisterUseCase } from '../application/use-cases/auth/RegisterUseCase';
import { LoginUseCase } from '../application/use-cases/auth/LoginUseCase';
import { VerifyEmailUseCase } from '../application/use-cases/auth/VerifyEmailUseCase';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { User } from '@prisma/client';
import { AppError } from '../domain/errors/AppError';

jest.mock('../application/use-cases/auth/RegisterUseCase');
jest.mock('../application/use-cases/auth/LoginUseCase');
jest.mock('../application/use-cases/auth/VerifyEmailUseCase');

describe('AuthController', () => {
  let authController: AuthController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let registerUseCase: jest.Mocked<RegisterUseCase>;
  let loginUseCase: jest.Mocked<LoginUseCase>;
  let verifyEmailUseCase: jest.Mocked<VerifyEmailUseCase>;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    registerUseCase = jest.mocked(new RegisterUseCase(mockUserRepository));
    loginUseCase = jest.mocked(new LoginUseCase(mockUserRepository));
    verifyEmailUseCase = jest.mocked(new VerifyEmailUseCase(mockUserRepository));

    authController = new AuthController(registerUseCase, loginUseCase, verifyEmailUseCase);
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'Password123!',
        name: 'Test User',
      };

      mockRequest = {
        body: mockUser,
      };

      const mockRegisteredUser: User = {
        id: '1',
        email: mockUser.email,
        password: 'hashedPassword',
        name: mockUser.name,
        emailVerified: false,
        otpEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(registerUseCase, 'execute').mockResolvedValue(mockRegisteredUser);

      await authController.register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          user: mockRegisteredUser,
          message: 'User registered successfully',
        },
      });
    });

    it('should handle registration error', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'Password123!',
        name: 'Test User',
      };

      mockRequest = {
        body: mockUser,
      };

      jest
        .spyOn(registerUseCase, 'execute')
        .mockRejectedValue(new AppError(409, 'Email already exists', 'USER_EXISTS'));

      await expect(
        authController.register(mockRequest as Request, mockResponse as Response),
      ).rejects.toThrow(AppError);
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const mockCredentials = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      mockRequest = {
        body: mockCredentials,
      };

      const mockLoginResult = {
        token: 'jwt-token',
        user: {
          id: '1',
          email: mockCredentials.email,
          name: 'Test User',
        },
      };

      jest.spyOn(loginUseCase, 'execute').mockResolvedValue(mockLoginResult);

      await authController.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockLoginResult,
      });
    });

    it('should handle invalid credentials', async () => {
      const mockCredentials = {
        email: 'test@example.com',
        password: 'WrongPassword',
      };

      mockRequest = {
        body: mockCredentials,
      };

      jest
        .spyOn(loginUseCase, 'execute')
        .mockRejectedValue(new AppError(401, 'Invalid credentials', 'INVALID_CREDENTIALS'));

      await expect(
        authController.login(mockRequest as Request, mockResponse as Response),
      ).rejects.toThrow(AppError);
    });
  });

  describe('verifyEmail', () => {
    it('should verify email successfully', async () => {
      const mockToken = 'valid-verification-token';

      mockRequest = {
        query: { token: mockToken },
      };

      jest.spyOn(verifyEmailUseCase, 'execute').mockResolvedValue();

      await authController.verifyEmail(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Email verified successfully',
      });
    });

    it('should handle invalid verification token', async () => {
      const mockToken = 'invalid-token';

      mockRequest = {
        query: { token: mockToken },
      };

      jest
        .spyOn(verifyEmailUseCase, 'execute')
        .mockRejectedValue(new AppError(400, 'Invalid verification token', 'INVALID_TOKEN'));

      await expect(
        authController.verifyEmail(mockRequest as Request, mockResponse as Response),
      ).rejects.toThrow(AppError);
    });
  });
});
