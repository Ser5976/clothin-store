import { z } from 'zod';

export const CustomersValidator = z.object({
  name: z.string().min(1, 'Name is required'),
  longtext: z.string().min(1, 'Text is required'),
});

export type CustomersDataType = z.infer<typeof CustomersValidator>;
