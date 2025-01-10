import { Request, Response, NextFunction } from "express";

export declare function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response;
