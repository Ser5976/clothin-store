import { z } from 'zod';

export const OrderValidator = z.object({
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone is required'),
  firstName: z.string().min(1, 'firstName is required'),
  lastName: z.string().min(1, 'lastName is required'),
  subtotal: z.number({ required_error: 'Subtotal is required' }),
  shippingCost: z.number({ required_error: 'SppingCost is required' }),
  discount: z.number().nullable(),
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
  ),
});

export type OrderDataType = z.infer<typeof OrderValidator>;
