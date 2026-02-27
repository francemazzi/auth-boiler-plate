export interface IEmailService {
  sendWelcomeEmail(email: string, name: string, token: string): Promise<void>;
}
