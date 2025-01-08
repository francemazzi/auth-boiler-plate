import { Socket } from "net";

export class EmailService {
  private readonly host: string;
  private readonly port: number;

  constructor() {
    this.host = process.env.SMTP_HOST || "mailhog";
    this.port = Number(process.env.SMTP_PORT) || 1025;
  }

  private createConnection(): Promise<Socket> {
    return new Promise((resolve, reject) => {
      const socket = new Socket();

      socket.connect(this.port, this.host, () => {
        resolve(socket);
      });

      socket.on("error", (err) => {
        reject(err);
      });
    });
  }

  private async sendCommand(socket: Socket, command: string): Promise<void> {
    return new Promise((resolve) => {
      socket.write(command + "\r\n");
      socket.once("data", () => {
        resolve();
      });
    });
  }

  async sendWelcomeEmail(
    email: string,
    name: string,
    token: string
  ): Promise<void> {
    const socket = await this.createConnection();
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify?token=${token}`;

    const message = [
      "Subject: Benvenuto in FormIt - Verifica il tuo account",
      "From: FormIt App <noreply@formit.com>",
      `To: ${email}`,
      "Content-Type: text/html; charset=utf-8",
      "",
      `<h1>Benvenuto in FormIt, ${name}!</h1>`,
      "<p>Grazie per esserti registrato. Per completare la registrazione, clicca sul link seguente:</p>",
      "<p>",
      `  <a href="${verificationLink}">Verifica il tuo account</a>`,
      "</p>",
      "<p>Se non hai creato tu questo account, ignora questa email.</p>",
      ".",
      "",
    ].join("\r\n");

    try {
      await this.sendCommand(socket, "HELO formit.com");
      await this.sendCommand(socket, `MAIL FROM:<noreply@formit.com>`);
      await this.sendCommand(socket, `RCPT TO:<${email}>`);
      await this.sendCommand(socket, "DATA");
      await this.sendCommand(socket, message);
      await this.sendCommand(socket, "QUIT");
    } finally {
      socket.end();
    }
  }
}
