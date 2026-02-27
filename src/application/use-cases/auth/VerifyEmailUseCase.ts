import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { ITokenService } from '../../../domain/services/ITokenService.js';
import { AppError } from '../../../domain/errors/AppError.js';

interface VerifyEmailDTO {
  token: string;
}

interface EmailVerificationPayload {
  userId: string;
  type: string;
  iat: number;
  exp: number;
}

export class VerifyEmailUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService,
  ) {}

  async execute({ token }: VerifyEmailDTO): Promise<void> {
    let decoded: EmailVerificationPayload;

    try {
      decoded = this.tokenService.verify<EmailVerificationPayload>(token);
    } catch {
      throw AppError.badRequest('Invalid verification token', 'INVALID_TOKEN');
    }

    if (decoded.type !== 'email_verification') {
      throw AppError.badRequest('Invalid token type', 'INVALID_TOKEN_TYPE');
    }

    const user = await this.userRepository.findById(decoded.userId);

    if (!user) {
      throw AppError.notFound('User not found', 'USER_NOT_FOUND');
    }

    await this.userRepository.update(user.id, {
      ...user,
      emailVerified: true,
    });
  }
}
