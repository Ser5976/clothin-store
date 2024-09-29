import { z } from 'zod';

export const PersonalPasswordFormValidator = z.object({
  currentPassword: z
    .string()
    .min(1, 'Password is required')
    .min(5, 'Password must have more than 5 characters'),
  newPassword: z
    .string()
    .min(1, 'Password is required')
    .min(5, 'Password must have more than 5 characters'),
});

export type PersonalPasswordFormType = z.infer<
  typeof PersonalPasswordFormValidator
>;
