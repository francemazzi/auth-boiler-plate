import { User } from '../../../domain/entities/User.js';
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { IPasswordService } from '../../../domain/services/IPasswordService.js';
import { ITokenService } from '../../../domain/services/ITokenService.js';
import { IEmailService } from '../../../domain/services/IEmailService.js';
import { AppError } from '../../../domain/errors/AppError.js';

interface RegisterDTO {
  email: string;
  password: string;
  name: string;
}

export class RegisterUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService,
    private emailService: IEmailService,
  ) {}

  async execute({ email, password, name }: RegisterDTO): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw AppError.conflict('User already exists', 'USER_EXISTS');
    }

    const hashedPassword = await this.passwordService.hash(password);

    const user = User.create({
      email,
      password: hashedPassword,
      name,
    });

    const createdUser = await this.userRepository.create(user);

    const verificationToken = this.tokenService.sign(
      {
        userId: createdUser.id,
        type: 'email_verification',
      },
      '1d',
    );

    // Best-effort email: don't block registration if email fails
    try {
      await this.emailService.sendWelcomeEmail(
        createdUser.email,
        createdUser.name,
        verificationToken,
      );
    } catch (_) {
      // Intentionally ignored: email failure should not invalidate registration
    }

    return createdUser;
  }
}
