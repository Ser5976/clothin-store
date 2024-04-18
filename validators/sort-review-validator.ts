import { z } from 'zod';

export const SortReviewValidator = z.object({
  newest: z.boolean(),
  rating: z.boolean(),
  reset: z.boolean(),
  page: z.number(),
});

export type SortReviewDataType = z.infer<typeof SortReviewValidator>;
