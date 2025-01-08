import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return new User(
      createdUser.id,
      createdUser.email,
      createdUser.password,
      createdUser.name,
      createdUser.emailVerified,
      createdUser.createdAt,
      createdUser.updatedAt
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.password,
      user.name,
      user.emailVerified,
      user.createdAt,
      user.updatedAt
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.password,
      user.name,
      user.emailVerified,
      user.createdAt,
      user.updatedAt
    );
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: userData,
    });

    return new User(
      updatedUser.id,
      updatedUser.email,
      updatedUser.password,
      updatedUser.name,
      updatedUser.emailVerified,
      updatedUser.createdAt,
      updatedUser.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
