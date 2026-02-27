export interface IOTPService {
  generateSecret(userId: string, email: string): Promise<{ secret: string; qrCode: string }>;
  verifyToken(userId: string, token: string): Promise<boolean>;
  deleteSecret(userId: string): Promise<void>;
}
