import { z } from 'zod';

export const RequisitesValidator = z.object({
  title: z.string().optional(),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email(),
});

export type RequisitesDataType = z.infer<typeof RequisitesValidator>;
