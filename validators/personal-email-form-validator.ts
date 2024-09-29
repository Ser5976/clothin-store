import { z } from 'zod';

export const PersonalEmailFormValidator = z.object({
  email: z.string().email('Invalid email').min(2, 'Email is required'),
});

export type PersonalEmailFormType = z.infer<typeof PersonalEmailFormValidator>;
