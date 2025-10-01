import { Request, Response } from 'express';
import { RegisterUseCase } from '../../../application/use-cases/auth/RegisterUseCase';
import { LoginUseCase } from '../../../application/use-cases/auth/LoginUseCase';
import { VerifyEmailUseCase } from '../../../application/use-cases/auth/VerifyEmailUseCase';
import { AppError } from '../../../domain/errors/AppError';

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
  ) {}

  async register(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;

    if (!email || !password || !name) {
      throw AppError.badRequest('Missing required fields', 'MISSING_FIELDS');
    }

    try {
      const user = await this.registerUseCase.execute({
        email,
        password,
        name,
      });

      return response.status(201).json({
        status: 'success',
        data: {
          user,
          message: 'User registered successfully',
        },
      });
    } catch (error) {
      if (error.message.includes('already exists')) {
        throw AppError.conflict(error.message, 'USER_EXISTS');
      }
      throw AppError.internal('Registration failed');
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if (!email || !password) {
      throw AppError.badRequest('Email and password are required', 'MISSING_CREDENTIALS');
    }

    try {
      const result = await this.loginUseCase.execute({
        email,
        password,
      });

      response.cookie('auth_token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return response.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      throw AppError.unauthorized(error.message, 'INVALID_CREDENTIALS');
    }
  }

  async verifyEmail(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;

    if (!token) {
      throw AppError.badRequest('Token is required', 'MISSING_TOKEN');
    }

    try {
      await this.verifyEmailUseCase.execute({
        token: token as string,
      });

      return response.status(200).json({
        status: 'success',
        message: 'Email verified successfully',
      });
    } catch (error) {
      throw AppError.badRequest(error.message, 'INVALID_TOKEN');
    }
  }
}
