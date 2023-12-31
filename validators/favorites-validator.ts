import { z } from 'zod';

export const FavoritesValidator = z.object({
  productIdArray: z.array(z.object({ productId: z.string() })).optional(),
  productId: z.string().optional(),
});

export type FavoritesDataType = z.infer<typeof FavoritesValidator>;
