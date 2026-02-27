import { Request, Response } from 'express';
import { EnableOTPUseCase } from '../../../application/use-cases/otp/EnableOTPUseCase.js';
import { VerifyOTPUseCase } from '../../../application/use-cases/otp/VerifyOTPUseCase.js';
import { DisableOTPUseCase } from '../../../application/use-cases/otp/DisableOTPUseCase.js';
import { AppError } from '../../../domain/errors/AppError.js';

export class OTPController {
  constructor(
    private enableOTPUseCase: EnableOTPUseCase,
    private verifyOTPUseCase: VerifyOTPUseCase,
    private disableOTPUseCase: DisableOTPUseCase,
  ) {}

  async enable(request: Request, response: Response): Promise<Response> {
    const userId = request.user?.id;

    if (!userId) {
      throw AppError.unauthorized('Unauthorized', 'NOT_AUTHENTICATED');
    }

    const result = await this.enableOTPUseCase.execute({ userId });
    return response.json(result);
  }

  async verify(request: Request, response: Response): Promise<Response> {
    const userId = request.user?.id;
    const { token } = request.body;

    if (!userId) {
      throw AppError.unauthorized('Unauthorized', 'NOT_AUTHENTICATED');
    }

    const isValid = await this.verifyOTPUseCase.execute({ userId, token });
    return response.json({ valid: isValid });
  }

  async disable(request: Request, response: Response): Promise<Response> {
    const userId = request.user?.id;
    const { token } = request.body;

    if (!userId) {
      throw AppError.unauthorized('Unauthorized', 'NOT_AUTHENTICATED');
    }

    await this.disableOTPUseCase.execute({ userId, token });
    return response.json({ message: 'OTP disabled successfully' });
  }
}
