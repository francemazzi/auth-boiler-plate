import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { AuthController } from '../infrastructure/http/controllers/AuthController.js';
import { Request, Response } from 'express';
import { RegisterUseCase } from '../application/use-cases/auth/RegisterUseCase.js';
import { LoginUseCase } from '../application/use-cases/auth/LoginUseCase.js';
import { VerifyEmailUseCase } from '../application/use-cases/auth/VerifyEmailUseCase.js';
import { IUserRepository } from '../domain/repositories/IUserRepository.js';
import { IPasswordService } from '../domain/services/IPasswordService.js';
import { ITokenService } from '../domain/services/ITokenService.js';
import { IEmailService } from '../domain/services/IEmailService.js';
import { User } from '../domain/entities/User.js';
import { AppError } from '../domain/errors/AppError.js';

jest.mock('../application/use-cases/auth/RegisterUseCase.js');
jest.mock('../application/use-cases/auth/LoginUseCase.js');
jest.mock('../application/use-cases/auth/VerifyEmailUseCase.js');

describe('AuthController', () => {
  let authController: AuthController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let registerUseCase: jest.Mocked<RegisterUseCase>;
  let loginUseCase: jest.Mocked<LoginUseCase>;
  let verifyEmailUseCase: jest.Mocked<VerifyEmailUseCase>;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockPasswordService: jest.Mocked<IPasswordService>;
  let mockTokenService: jest.Mocked<ITokenService>;
  let mockEmailService: jest.Mocked<IEmailService>;

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    mockPasswordService = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as jest.Mocked<IPasswordService>;

    mockTokenService = {
      sign: jest.fn(),
      verify: jest.fn(),
    } as jest.Mocked<ITokenService>;

    mockEmailService = {
      sendWelcomeEmail: jest.fn(),
    } as jest.Mocked<IEmailService>;

    registerUseCase = jest.mocked(
      new RegisterUseCase(
        mockUserRepository,
        mockPasswordService,
        mockTokenService,
        mockEmailService,
      ),
    );
    loginUseCase = jest.mocked(
      new LoginUseCase(mockUserRepository, mockPasswordService, mockTokenService),
    );
    verifyEmailUseCase = jest.mocked(new VerifyEmailUseCase(mockUserRepository, mockTokenService));

    authController = new AuthController(registerUseCase, loginUseCase, verifyEmailUseCase);
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnThis(),
    } as unknown as Partial<Response>;
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

      const mockRegisteredUser = new User(
        '1',
        mockUser.email,
        'hashedPassword',
        mockUser.name,
        false,
        false,
        new Date(),
        new Date(),
      );

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

    it('should throw on missing fields', async () => {
      mockRequest = {
        body: { email: 'test@example.com' },
      };

      await expect(
        authController.register(mockRequest as Request, mockResponse as Response),
      ).rejects.toThrow(AppError);
    });

    it('should propagate use case errors', async () => {
      mockRequest = {
        body: {
          email: 'test@example.com',
          password: 'Password123!',
          name: 'Test User',
        },
      };

      jest
        .spyOn(registerUseCase, 'execute')
        .mockRejectedValue(AppError.conflict('User already exists', 'USER_EXISTS'));

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

    it('should throw on missing credentials', async () => {
      mockRequest = {
        body: { email: 'test@example.com' },
      };

      await expect(
        authController.login(mockRequest as Request, mockResponse as Response),
      ).rejects.toThrow(AppError);
    });

    it('should propagate invalid credentials error', async () => {
      mockRequest = {
        body: {
          email: 'test@example.com',
          password: 'WrongPassword',
        },
      };

      jest
        .spyOn(loginUseCase, 'execute')
        .mockRejectedValue(AppError.unauthorized('Invalid credentials', 'INVALID_CREDENTIALS'));

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

    it('should propagate invalid token error', async () => {
      const mockToken = 'invalid-token';

      mockRequest = {
        query: { token: mockToken },
      };

      jest
        .spyOn(verifyEmailUseCase, 'execute')
        .mockRejectedValue(AppError.badRequest('Invalid verification token', 'INVALID_TOKEN'));

      await expect(
        authController.verifyEmail(mockRequest as Request, mockResponse as Response),
      ).rejects.toThrow(AppError);
    });
  });
});
