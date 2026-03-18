import { z } from 'zod';
import { citySchema } from './common.validators';

const weatherQuerySchema = z.object({
  city: citySchema
});

export { weatherQuerySchema };
