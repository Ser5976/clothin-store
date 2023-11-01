import { z } from 'zod';

export const TypeValidator = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type TypeDataType = z.infer<typeof TypeValidator>;
