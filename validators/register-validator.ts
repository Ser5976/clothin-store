import { z } from 'zod';

export const RegisterValidator = z.object({
  name: z.string(),
  email: z.string().email('Invalid email').min(2, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(5, 'Password must have more than 5 characters'),
});

export type RegisterDataType = z.infer<typeof RegisterValidator>;
