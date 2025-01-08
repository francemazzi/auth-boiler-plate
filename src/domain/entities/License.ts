import { randomUUID } from "crypto";

export class License {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly key: string,
    public readonly isActive: boolean,
    public readonly expiresAt: Date,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(
    props: Omit<License, "id" | "createdAt" | "updatedAt">
  ): License {
    return new License(
      randomUUID(),
      props.type,
      props.key,
      props.isActive,
      props.expiresAt,
      props.userId,
      new Date(),
      new Date()
    );
  }
}
