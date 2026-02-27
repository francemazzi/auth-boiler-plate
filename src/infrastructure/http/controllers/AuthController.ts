import { Request, Response } from 'express';
import { RegisterUseCase } from '../../../application/use-cases/auth/RegisterUseCase.js';
import { LoginUseCase } from '../../../application/use-cases/auth/LoginUseCase.js';
import { VerifyEmailUseCase } from '../../../application/use-cases/auth/VerifyEmailUseCase.js';
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { AppError } from '../../../domain/errors/AppError.js';

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
    private readonly userRepository?: IUserRepository,
  ) {}

  async register(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;

    if (!email || !password || !name) {
      throw AppError.badRequest('Missing required fields', 'MISSING_FIELDS');
    }

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
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if (!email || !password) {
      throw AppError.badRequest('Email and password are required', 'MISSING_CREDENTIALS');
    }

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
  }

  async verifyEmail(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;

    if (!token) {
      throw AppError.badRequest('Token is required', 'MISSING_TOKEN');
    }

    await this.verifyEmailUseCase.execute({
      token: token as string,
    });

    return response.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });
  }

  async me(request: Request, response: Response): Promise<Response> {
    if (!request.user) {
      throw AppError.unauthorized('User not authenticated', 'NOT_AUTHENTICATED');
    }

    if (!this.userRepository) {
      throw AppError.internal('User repository not configured');
    }

    const user = await this.userRepository.findById(request.user.id);

    if (!user) {
      throw AppError.notFound('User not found', 'USER_NOT_FOUND');
    }

    return response.json({
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
    });
  }
}
