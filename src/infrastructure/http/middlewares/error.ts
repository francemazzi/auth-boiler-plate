import { Request, Response, NextFunction } from 'express';
import { AppError, ErrorType } from '../../../domain/errors/AppError.js';

const errorTypeToStatusCode: Record<ErrorType, number> = {
  [ErrorType.VALIDATION]: 400,
  [ErrorType.UNAUTHORIZED]: 401,
  [ErrorType.FORBIDDEN]: 403,
  [ErrorType.NOT_FOUND]: 404,
  [ErrorType.CONFLICT]: 409,
  [ErrorType.INTERNAL]: 500,
};

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  if (err instanceof AppError) {
    const statusCode = errorTypeToStatusCode[err.type];
    return res.status(statusCode).json({
      status: 'error',
      message: err.message,
      code: err.code,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid JSON',
      code: 'INVALID_JSON',
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    code: 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
