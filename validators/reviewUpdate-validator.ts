import { z } from 'zod';

export const ReviewUpdateValidator = z.object({
  content: z.string().min(1, 'Content is required'),
  response: z.string().optional(),
});

export type ReviewUpdateDataType = z.infer<typeof ReviewUpdateValidator>;
