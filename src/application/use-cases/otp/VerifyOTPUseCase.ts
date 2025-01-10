import { PrismaClient } from "@prisma/client";
import { OTPService } from "../../../infrastructure/services/OTPService";
import { VerifyOTPRequest } from "../../../domain/types/otp";

export class VerifyOTPUseCase {
  constructor(private prisma: PrismaClient, private otpService: OTPService) {}

  async execute({ userId, token }: VerifyOTPRequest): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Utente non trovato");
    }

    if (!user.otpEnabled) {
      throw new Error("OTP non abilitato per questo utente");
    }

    return this.otpService.verifyToken(userId, token);
  }
}
