import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { IOTPService } from '../../../domain/services/IOTPService.js';
import { EnableOTPRequest, EnableOTPResponse } from '../../../domain/types/otp.js';
import { AppError } from '../../../domain/errors/AppError.js';

export class EnableOTPUseCase {
  constructor(
    private userRepository: IUserRepository,
    private otpService: IOTPService,
  ) {}

  async execute({ userId }: EnableOTPRequest): Promise<EnableOTPResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw AppError.notFound('User not found', 'USER_NOT_FOUND');
    }

    if (user.otpEnabled) {
      throw AppError.conflict('OTP already enabled for this user', 'OTP_ALREADY_ENABLED');
    }

    const { secret, qrCode } = await this.otpService.generateSecret(userId, user.email);

    await this.userRepository.update(userId, { ...user, otpEnabled: true });

    return { secret, qrCode };
  }
}
