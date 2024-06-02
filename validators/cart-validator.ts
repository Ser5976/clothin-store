import { z } from 'zod';

export const CartValidator = z
  .object({
    productId: z.string().min(1, 'ProductId is required'),
    name: z.string().min(1, 'Name is required'),
    price: z.number(),
    oldPrice: z.number().nullable(),
    totalPrice: z.number(),
    totalOldPrice: z.number(),
    discount: z.number().nullable(),
    image: z.string().min(1, 'Image is required'),
    quantity: z.number().default(1),
    size: z.string().min(1, 'Size is required'),
    color: z.string().min(1, 'Color is required'),
  })
  .array();

export type CartDataType = z.infer<typeof CartValidator>;
