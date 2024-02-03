import { z } from 'zod';

export const OrderValidator = z.object({
  userId: z.string().optional(),
  phone: z.string().min(1, 'Phone is required'),
  name: z.string().min(1, 'Name is required'),
  address: z.object({
    country: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    street: z.string().min(1, 'Street is required'),
    house: z.string().min(1, 'House is required'),
    flat: z.string().optional(),
    postalCode: z.string().optional(),
  }),
  orderItems: z.array(
    z.object({
      productId: z.string().min(1, 'ProductId is required'),
      price: z.number({ required_error: 'Price is required' }),
      quantity: z.number().min(1).default(1),
    })
  ),
});

export type OrderDataType = z.infer<typeof OrderValidator>;
