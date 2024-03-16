import { z } from 'zod';

export const ReviewUpdateValidator = z.object({
  name: z.string().min(1, 'name is required'),
  content: z.string().min(1, 'Content is required'),
  response: z.string().optional(),
});

export type ReviewUpdateDataType = z.infer<typeof ReviewUpdateValidator>;
