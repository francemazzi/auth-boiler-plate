import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal server error' });
};
