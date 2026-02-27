import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { IPasswordService } from '../../../domain/services/IPasswordService.js';
import { ITokenService } from '../../../domain/services/ITokenService.js';
import { AppError } from '../../../domain/errors/AppError.js';

interface LoginDTO {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService,
  ) {}

  async execute({ email, password }: LoginDTO): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw AppError.unauthorized('Invalid credentials', 'INVALID_CREDENTIALS');
    }

    const passwordMatch = await this.passwordService.compare(password, user.password);

    if (!passwordMatch) {
      throw AppError.unauthorized('Invalid credentials', 'INVALID_CREDENTIALS');
    }

    const token = this.tokenService.sign({ userId: user.id }, '1d');

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
