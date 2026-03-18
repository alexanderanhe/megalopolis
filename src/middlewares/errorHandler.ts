import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/apiError';
import env from '../config/env';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;
  const errorCode = isApiError ? err.errorCode : 'INTERNAL_ERROR';
  const message = isApiError ? err.message : 'Unexpected error';

  const payload: Record<string, unknown> = {
    success: false,
    message,
    error: errorCode
  };

  if (env.nodeEnv === 'production') {
    res.status(statusCode).json(payload);
    return;
  }

  payload.stack = err.stack;
  res.status(statusCode).json(payload);
};

export default errorHandler;
