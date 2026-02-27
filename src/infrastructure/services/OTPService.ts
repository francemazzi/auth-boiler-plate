import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import type { PrismaClient } from '../../generated/prisma/client.js';
import { IOTPService } from '../../domain/services/IOTPService.js';

export class OTPService implements IOTPService {
  constructor(private prisma: PrismaClient) {}

  async generateSecret(userId: string, email: string): Promise<{ secret: string; qrCode: string }> {
    const secretTemp = speakeasy.generateSecret({
      name: `AuthBoilerplate:${email}`,
    });

    const secret = secretTemp.base32;
    const otpauth_url = secretTemp.otpauth_url!;

    const qrCode = await QRCode.toDataURL(otpauth_url);

    await this.prisma.oTPSecret.create({
      data: {
        secret,
        userId,
      },
    });

    return {
      secret,
      qrCode,
    };
  }

  async verifyToken(userId: string, token: string): Promise<boolean> {
    const otpSecret = await this.prisma.oTPSecret.findUnique({
      where: { userId },
    });

    if (!otpSecret) {
      throw new Error('OTP not configured for this user');
    }

    return speakeasy.totp.verify({
      secret: otpSecret.secret,
      encoding: 'base32',
      token,
    });
  }

  async deleteSecret(userId: string): Promise<void> {
    await this.prisma.oTPSecret.delete({
      where: { userId },
    });
  }
}

export default OTPService;
