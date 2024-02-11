import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string(),
  legalNumber: z.string(),
  country: z.string(),
  website: z.string(),
});
