import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/apiError';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError('Route not found', 404, 'NOT_FOUND'));
};

export default notFound;
