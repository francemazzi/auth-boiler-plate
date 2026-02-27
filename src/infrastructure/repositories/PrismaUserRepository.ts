import type { PrismaClient } from '../../generated/prisma/client.js';
import { User } from '../../domain/entities/User.js';
import { IUserRepository } from '../../domain/repositories/IUserRepository.js';

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  private toDomain(record: {
    id: string;
    email: string;
    password: string;
    name: string;
    emailVerified: boolean;
    otpEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User(
      record.id,
      record.email,
      record.password,
      record.name,
      record.emailVerified,
      record.otpEnabled,
      record.createdAt,
      record.updatedAt,
    );
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        emailVerified: user.emailVerified,
        otpEnabled: user.otpEnabled,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return this.toDomain(createdUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return this.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return this.toDomain(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: userData,
    });

    return this.toDomain(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
