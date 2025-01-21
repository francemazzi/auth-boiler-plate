import { Request, Response } from 'express';
import { RegisterUseCase } from '../../../application/use-cases/auth/RegisterUseCase';
import { LoginUseCase } from '../../../application/use-cases/auth/LoginUseCase';
import { VerifyEmailUseCase } from '../../../application/use-cases/auth/VerifyEmailUseCase';

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
  ) {}

  async register(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;

    try {
      const user = await this.registerUseCase.execute({
        email,
        password,
        name,
      });

      return response.status(201).json({
        user,
        message: 'User registered successfully',
      });
    } catch (error) {
      return response.status(400).json({
        message: error instanceof Error ? error.message : 'Registration failed',
      });
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const result = await this.loginUseCase.execute({
        email,
        password,
      });

      return response.status(200).json(result);
    } catch (error) {
      return response.status(401).json({
        message: error instanceof Error ? error.message : 'Authentication failed',
      });
    }
  }

  async verifyEmail(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;

    try {
      await this.verifyEmailUseCase.execute({
        token: token as string,
      });

      return response.status(200).json({
        message: 'Email verified successfully',
      });
    } catch (error) {
      return response.status(400).json({
        message: error instanceof Error ? error.message : 'Email verification failed',
      });
    }
  }
}
