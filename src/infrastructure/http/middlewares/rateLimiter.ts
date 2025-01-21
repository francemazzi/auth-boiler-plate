import { Request, Response, NextFunction } from 'express';
import { LRUCache } from 'lru-cache';

const limiter = new LRUCache<string, number>({
  max: 500,
  ttl: 60 * 1000, // 1 minute
});

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const currentRequests = limiter.get(ip) || 0;

  if (currentRequests >= 100) {
    return res.status(429).json({ message: 'Too many requests' });
  }

  limiter.set(ip, currentRequests + 1);
  return next();
};
