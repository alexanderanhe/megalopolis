import { z } from 'zod';

const citySchema = z.string().min(1).max(50).transform((val) => val.trim().toLowerCase());

export { citySchema };
