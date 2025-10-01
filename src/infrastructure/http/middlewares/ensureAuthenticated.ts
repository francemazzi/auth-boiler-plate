import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
    };
  }
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      response.status(401).json({ message: 'JWT token is missing' });
      return;
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      response.status(401).json({ message: 'Invalid token format' });
      return;
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET || 'default_secret') as TokenPayload;

      request.user = {
        id: decoded.userId,
      };

      return next();
    } catch (error) {
      response.status(401).json({ message: 'Invalid JWT token' });
    }
  } catch (error) {
    response.status(500).json({ message: 'Internal server error' });
  }
}
