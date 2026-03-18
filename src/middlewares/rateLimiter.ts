import rateLimit from 'express-rate-limit';
import env from '../config/env';

const rateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
    error: 'RATE_LIMIT'
  }
});

export default rateLimiter;
