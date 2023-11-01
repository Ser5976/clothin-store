import { z } from 'zod';

export const SizeValidator = z.object({
  value: z.string().min(1, 'Value is required'),
});

export type SizeDataType = z.infer<typeof SizeValidator>;
