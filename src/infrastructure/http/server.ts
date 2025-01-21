import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { router } from './routes';
import { errorHandler } from './middlewares/error';
import { rateLimiter } from './middlewares/rateLimiter';
import path from 'path';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
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

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Auth API',
      version: '1.0.0',
    },
  },
  apis: ['./src/infrastructure/http/routes/*.ts'],
});

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(swaggerSpec));
});

app.use('/api', router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`Database URL: ${process.env.DATABASE_URL}`);
  console.log(`SMTP Host: ${process.env.SMTP_HOST}`);
  console.log(`SMTP Port: ${process.env.SMTP_PORT}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
