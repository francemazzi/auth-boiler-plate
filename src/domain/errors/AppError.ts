export enum ErrorType {
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  CONFLICT = 'CONFLICT',
  INTERNAL = 'INTERNAL',
}

export class AppError extends Error {
  constructor(
    public readonly type: ErrorType,
    public readonly message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message: string, code?: string): AppError {
    return new AppError(ErrorType.VALIDATION, message, code);
  }

  static unauthorized(message: string, code?: string): AppError {
    return new AppError(ErrorType.UNAUTHORIZED, message, code);
  }

  static forbidden(message: string, code?: string): AppError {
    return new AppError(ErrorType.FORBIDDEN, message, code);
  }

  static notFound(message: string, code?: string): AppError {
    return new AppError(ErrorType.NOT_FOUND, message, code);
  }

  static conflict(message: string, code?: string): AppError {
    return new AppError(ErrorType.CONFLICT, message, code);
  }

  static internal(message: string, code?: string): AppError {
    return new AppError(ErrorType.INTERNAL, message, code);
  }
}
