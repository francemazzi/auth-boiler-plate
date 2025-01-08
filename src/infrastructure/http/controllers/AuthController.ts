import { Request, Response } from "express";
import { RegisterUseCase } from "../../../application/use-cases/auth/RegisterUseCase";
import { LoginUseCase } from "../../../application/use-cases/auth/LoginUseCase";
import { VerifyEmailUseCase } from "../../../application/use-cases/auth/VerifyEmailUseCase";

export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
    private verifyEmailUseCase: VerifyEmailUseCase
  ) {}

  async register(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;

    try {
      const user = await this.registerUseCase.execute({
        email,
        password,
        name,
      });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const result = await this.loginUseCase.execute({
        email,
        password,
      });

      return response.json(result);
    } catch (error) {
      return response.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async verifyEmail(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;

    try {
      await this.verifyEmailUseCase.execute({
        token: String(token),
      });

      return response.json({ message: "Email verificata con successo" });
    } catch (error) {
      return response.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}
