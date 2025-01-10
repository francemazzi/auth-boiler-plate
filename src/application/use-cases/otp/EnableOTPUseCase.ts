import { PrismaClient } from "@prisma/client";
import { OTPService } from "../../../infrastructure/services/OTPService";
import { EnableOTPRequest, EnableOTPResponse } from "../../../domain/types/otp";

export class EnableOTPUseCase {
  constructor(private prisma: PrismaClient, private otpService: OTPService) {}

  async execute({ userId }: EnableOTPRequest): Promise<EnableOTPResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Utente non trovato");
    }

    if (user.otpEnabled) {
      throw new Error("OTP già abilitato per questo utente");
    }

    const { secret, qrCode } = await this.otpService.generateSecret(
      userId,
      user.email
    );

    await this.prisma.user.update({
      where: { id: userId },
      data: { otpEnabled: true },
    });

    return { secret, qrCode };
  }
}
