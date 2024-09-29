import { z } from 'zod';

export const PersonalPhoneFormValidator = z.object({
  phone: z.string().min(1, 'Phone is required'),
});

export type PersonalPhoneFormType = z.infer<typeof PersonalPhoneFormValidator>;
