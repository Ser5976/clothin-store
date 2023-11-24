import { z } from 'zod';

export const PhoneValidator = z.object({
  title: z.string().optional(),
  phone: z.string().min(1, 'Phone is required'),
});

export type PhoneDataType = z.infer<typeof PhoneValidator>;
