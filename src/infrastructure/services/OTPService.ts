import * as speakeasy from "speakeasy";
import * as QRCode from "qrcode";
import { PrismaClient } from "@prisma/client";

export class OTPService {
  constructor(private prisma: PrismaClient) {}

  async generateSecret(
    userId: string,
    email: string
  ): Promise<{ secret: string; qrCode: string }> {
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
      throw new Error("OTP non configurato per questo utente");
    }

    return speakeasy.totp.verify({
      secret: otpSecret.secret,
      encoding: "base32",
      token,
    });
  }

  async deleteSecret(userId: string): Promise<void> {
    await this.prisma.oTPSecret.delete({
      where: { userId },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: { otpEnabled: false },
    });
  }
}

export default OTPService;
