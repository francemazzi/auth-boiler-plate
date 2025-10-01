import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import { errorHandler } from './middlewares/error';
import { rateLimiter } from './middlewares/rateLimiter';
import path from 'path';
import { swaggerSpec } from './swagger';

const app = express();
const port = process.env.PORT || 8081;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  return next();
});

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    console.error('JSON Parse Error:', err.message);
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  return next(err);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (_req: Request, res: Response) => {
  return res.json({ status: 'ok' });
});

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', (_req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(swaggerSpec, {
      customSiteTitle: process.env.APP_NAME || 'Auth Boiler Plate',
      swaggerOptions: {
        persistAuthorization: true,
      },
    }),
  );
});

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`Database URL: ${process.env.DATABASE_URL}`);
  console.log(`SMTP Host: ${process.env.SMTP_HOST}`);
  console.log(`SMTP Port: ${process.env.SMTP_PORT}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
