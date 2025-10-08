/* eslint-disable */
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL?: string;
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: string;
    SMTP_HOST?: string;
    SMTP_PORT?: string;
    FRONTEND_URL?: string;
    NODE_ENV?: 'development' | 'test' | 'production';
    PORT?: string;
  }
}
