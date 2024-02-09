import { z } from 'zod';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(3);

export const createUserSchema = z.object({
  email: emailSchema,
  name: z.string(),
  password: passwordSchema,
});

export const loginUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
