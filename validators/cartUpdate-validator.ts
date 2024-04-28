import { z } from 'zod';

export const CartUpdateValidator = z.object({
  quantity: z.number({ required_error: 'Quntity is required' }),
  price: z.number({ required_error: 'Price is required' }),
  oldPrice: z.number().optional(),
});

export type CartUpdateDataType = z.infer<typeof CartUpdateValidator>;
