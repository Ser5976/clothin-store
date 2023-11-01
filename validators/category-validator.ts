import { z } from 'zod';

export const CategoryValidator = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type CategoryDataType = z.infer<typeof CategoryValidator>;
