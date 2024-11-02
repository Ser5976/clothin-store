import { z } from 'zod';

export const EditReviewFormValidator = z.object({
  content: z.string().min(2, 'Content is required'),
});

export type EditReviewFormType = z.infer<typeof EditReviewFormValidator>;
