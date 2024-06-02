import { z } from 'zod';

export const OrderValidator = z.object({
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone is required'),
  firstName: z.string().min(1, 'firstName is required'),
  lastName: z.string().min(1, 'lastName is required'),
  amount: z.number({ required_error: 'Amount is required' }),
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
      quantity: z.number().min(1).default(1),
    })
  ),
});

export type OrderDataType = z.infer<typeof OrderValidator>;
