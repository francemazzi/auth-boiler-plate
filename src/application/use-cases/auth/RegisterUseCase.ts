import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { EmailService } from '../../../infrastructure/services/EmailService';

interface RegisterDTO {
  email: string;
  password: string;
  name: string;
}

export class RegisterUseCase {
  private emailService: EmailService;

  constructor(private userRepository: IUserRepository) {
    this.emailService = new EmailService();
  }

  async execute({ email, password, name }: RegisterDTO): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = User.create({
      email,
      password: hashedPassword,
      name,
    });

    const createdUser = await this.userRepository.create(user);

    const verificationToken = sign(
      {
        userId: createdUser.id,
        type: 'email_verification',
      },
      process.env.JWT_SECRET || 'default_secret',
      {
        expiresIn: '1d',
      },
    );

    // Best-effort email: non bloccare la registrazione se l'email fallisce
    try {
      await this.emailService.sendWelcomeEmail(
        createdUser.email,
        createdUser.name,
        verificationToken,
      );
    } catch (_) {
      // Intenzionalmente ignorato in sviluppo: l'invio email non deve invalidare la registrazione
    }

    return createdUser;
  }
}
