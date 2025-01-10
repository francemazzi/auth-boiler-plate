import { PrismaClient } from "@prisma/client";
import { OTPService } from "../../../infrastructure/services/OTPService";
import { DisableOTPRequest } from "../../../domain/types/otp";

export class DisableOTPUseCase {
  constructor(private prisma: PrismaClient, private otpService: OTPService) {}

  async execute({ userId, token }: DisableOTPRequest): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Utente non trovato");
    }

    if (!user.otpEnabled) {
      throw new Error("OTP non abilitato per questo utente");
    }

    const isValid = await this.otpService.verifyToken(userId, token);
    if (!isValid) {
      throw new Error("Token OTP non valido");
    }

    await this.otpService.deleteSecret(userId);
  }
}
