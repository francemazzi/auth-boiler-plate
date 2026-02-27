export interface ITokenService {
  sign(payload: Record<string, unknown>, expiresIn: string): string;
  verify<T = Record<string, unknown>>(token: string): T;
}
