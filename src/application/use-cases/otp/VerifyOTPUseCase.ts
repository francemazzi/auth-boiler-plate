import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { IOTPService } from '../../../domain/services/IOTPService.js';
import { VerifyOTPRequest } from '../../../domain/types/otp.js';
import { AppError } from '../../../domain/errors/AppError.js';

export class VerifyOTPUseCase {
  constructor(
    private userRepository: IUserRepository,
    private otpService: IOTPService,
  ) {}

  async execute({ userId, token }: VerifyOTPRequest): Promise<boolean> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw AppError.notFound('User not found', 'USER_NOT_FOUND');
    }

    if (!user.otpEnabled) {
      throw AppError.badRequest('OTP not enabled for this user', 'OTP_NOT_ENABLED');
    }

    return this.otpService.verifyToken(userId, token);
  }
}
