import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  email: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
    req.user = { id: decoded.id };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
