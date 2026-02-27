import jwt from 'jsonwebtoken';
import { ITokenService } from '../../domain/services/ITokenService.js';

export class JwtTokenService implements ITokenService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'default_secret';
  }

  sign(payload: Record<string, unknown>, expiresIn: string): string {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  verify<T = Record<string, unknown>>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }
}
