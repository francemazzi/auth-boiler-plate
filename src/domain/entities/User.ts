import { randomUUID } from "node:crypto";

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly emailVerified: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(
    props: Omit<User, "id" | "createdAt" | "updatedAt" | "emailVerified">
  ): User {
    return new User(
      randomUUID(),
      props.email,
      props.password,
      props.name,
      false,
      new Date(),
      new Date()
    );
  }
}
