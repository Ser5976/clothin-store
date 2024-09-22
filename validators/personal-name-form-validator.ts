import { z } from 'zod';

export const PersonalNameFormValidator = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type PersonalNameFormType = z.infer<typeof PersonalNameFormValidator>;
