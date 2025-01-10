import { Request, Response } from "express";
import { EnableOTPUseCase } from "../../../application/use-cases/otp/EnableOTPUseCase";
import { VerifyOTPUseCase } from "../../../application/use-cases/otp/VerifyOTPUseCase";
import { DisableOTPUseCase } from "../../../application/use-cases/otp/DisableOTPUseCase";

export class OTPController {
  constructor(
    private enableOTPUseCase: EnableOTPUseCase,
    private verifyOTPUseCase: VerifyOTPUseCase,
    private disableOTPUseCase: DisableOTPUseCase
  ) {}

  async enable(request: Request, response: Response): Promise<Response> {
    const userId = request.user?.id;

    if (!userId) {
      return response.status(401).json({ message: "Non autorizzato" });
    }

    try {
      const result = await this.enableOTPUseCase.execute({ userId });
      return response.json(result);
    } catch (error) {
      return response.status(400).json({
        message: error instanceof Error ? error.message : "Errore inaspettato",
      });
    }
  }

  async verify(request: Request, response: Response): Promise<Response> {
    const userId = request.user?.id;
    const { token } = request.body;

    if (!userId) {
      return response.status(401).json({ message: "Non autorizzato" });
    }

    try {
      const isValid = await this.verifyOTPUseCase.execute({ userId, token });
      return response.json({ valid: isValid });
    } catch (error) {
      return response.status(400).json({
        message: error instanceof Error ? error.message : "Errore inaspettato",
      });
    }
  }

  async disable(request: Request, response: Response): Promise<Response> {
    const userId = request.user?.id;
    const { token } = request.body;

    if (!userId) {
      return response.status(401).json({ message: "Non autorizzato" });
    }

    try {
      await this.disableOTPUseCase.execute({ userId, token });
      return response.json({ message: "OTP disabilitato con successo" });
    } catch (error) {
      return response.status(400).json({
        message: error instanceof Error ? error.message : "Errore inaspettato",
      });
    }
  }
}
