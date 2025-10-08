import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { router } from './routes';
import { errorHandler } from './middlewares/error';
import { rateLimiter } from './middlewares/rateLimiter';
import { swaggerSpec } from './swagger';

export class AppFactory {
  public static create(): express.Express {
    const app = express();

    app.use(cors({ origin: true, credentials: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(rateLimiter);

    app.use((req: Request, _res: Response, next: NextFunction) => {
      if (process.env.REQUEST_LOG === 'true') {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      }
      return next();
    });

    app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
      if (err instanceof SyntaxError && 'body' in err) {
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

    return app;
  }
}
