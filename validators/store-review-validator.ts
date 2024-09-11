import { z } from 'zod';

export const StoreReviewValidator = z.object({
  content: z.string().min(1, 'Content is required'),
  response: z.string().optional(),
});

export type StoreReviewDataType = z.infer<typeof StoreReviewValidator>;
