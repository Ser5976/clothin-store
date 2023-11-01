import { z } from 'zod';

export const BrandValidator = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type BrandDataType = z.infer<typeof BrandValidator>;
