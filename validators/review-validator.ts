import { z } from 'zod';

export const ReviewValidator = z.object({
  name: z.string().min(1, 'Name is required'),
  content: z.string().min(1, 'Content is required'),
  estimation: z.string().min(1, 'Content is required'),
  productId: z.string().min(1, 'Product is required'),
});

export type ReviewDataType = z.infer<typeof ReviewValidator>;
