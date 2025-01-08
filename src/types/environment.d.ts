export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      FRONTEND_URL: string;
    }
  }
}
