import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { IOTPService } from '../../../domain/services/IOTPService.js';
import { DisableOTPRequest } from '../../../domain/types/otp.js';
import { AppError } from '../../../domain/errors/AppError.js';

export class DisableOTPUseCase {
  constructor(
    private userRepository: IUserRepository,
    private otpService: IOTPService,
  ) {}

  async execute({ userId, token }: DisableOTPRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw AppError.notFound('User not found', 'USER_NOT_FOUND');
    }

    if (!user.otpEnabled) {
      throw AppError.badRequest('OTP not enabled for this user', 'OTP_NOT_ENABLED');
    }

    const isValid = await this.otpService.verifyToken(userId, token);
    if (!isValid) {
      throw AppError.unauthorized('Invalid OTP token', 'INVALID_OTP_TOKEN');
    }

    await this.otpService.deleteSecret(userId);
    await this.userRepository.update(userId, { ...user, otpEnabled: false });
  }
}
