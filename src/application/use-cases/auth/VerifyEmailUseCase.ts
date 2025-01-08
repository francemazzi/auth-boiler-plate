import { verify } from "jsonwebtoken";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

interface VerifyEmailDTO {
  token: string;
}

interface TokenPayload {
  userId: string;
  type: string;
  iat: number;
  exp: number;
}

export class VerifyEmailUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ token }: VerifyEmailDTO): Promise<void> {
    try {
      const decoded = verify(
        token,
        process.env.JWT_SECRET || "default_secret"
      ) as TokenPayload;

      if (decoded.type !== "email_verification") {
        throw new Error("Invalid token type");
      }

      const user = await this.userRepository.findById(decoded.userId);

      if (!user) {
        throw new Error("User not found");
      }

      await this.userRepository.update(user.id, {
        ...user,
        emailVerified: true,
      });
    } catch (error) {
      throw new Error("Invalid verification token");
    }
  }
}
