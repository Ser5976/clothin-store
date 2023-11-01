import { z } from 'zod';

export const CartValidator = z.object({
  userId: z.string().min(1, 'UserId is required'),
  items: z.array(
    z.object({
      productId: z.string().min(1, 'ProductId is required'),
      quantity: z.number().default(0),
    })
  ),
});

export type CartDataType = z.infer<typeof CartValidator>;
