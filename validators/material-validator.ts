import { z } from 'zod';

export const MaterialValidator = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type MaterialDataType = z.infer<typeof MaterialValidator>;
