import { z } from 'zod';

export const FavoritesValidator = z.object({
  userId: z.string().min(1, 'UserId is required'),
  productId: z.string().min(1, 'Product is required'),
});

export type FavoritesDataType = z.infer<typeof FavoritesValidator>;
