import { z } from 'zod';

export const CartUpdateValidator = z.object({
  quantity: z.number({ required_error: 'Quntity is required' }),
});

export type CartUpdateDataType = z.infer<typeof CartUpdateValidator>;
