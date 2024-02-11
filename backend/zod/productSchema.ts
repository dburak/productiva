import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string(),
  category: z.string(),
  amount: z.number(),
  unit: z.string(),
  company: z.string(),
});

export const updateProductSchema = createProductSchema;
