import { z } from 'zod';

export const VoteReviewValidator = z.object({
  reviewId: z.string(),
});

export type VoteReviewDataType = z.infer<typeof VoteReviewValidator>;
