import { z } from 'zod';

export const ReviewValidator = z.object({
  name: z.string().min(1, 'Name is required'),
  content: z.string().min(1, 'Content is required'),
  response: z.string().optional(),
  userId: z.string().min(1, 'UaerId is required'),
  productId: z.string().min(1, 'Product is required'),
});

export type ReviewDataType = z.infer<typeof ReviewValidator>;
