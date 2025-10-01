import { Request, Response } from 'express';
import { EmailService } from '../../services/EmailService';
import { AppError } from '../../../domain/errors/AppError';

export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  async test(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    if (!email) {
      throw AppError.badRequest('Email is required', 'MISSING_EMAIL');
    }

    await this.emailService.sendTestEmail(email);

    return response.status(200).json({ status: 'success', message: 'Test email sent' });
  }
}
