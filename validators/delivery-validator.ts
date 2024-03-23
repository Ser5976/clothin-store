import { z } from 'zod';

export const DeliveryValidator = z.object({
  longtext: z.string().min(1, 'standartPrice is required'),
  standartPrice: z.string().min(1, 'standartPrice is required'),
  expressPrice: z.string().min(1, 'expressPrice is required'),
  orderPrice: z.string().min(1, 'orderPrice is required'),
});

export type DeliveryDataType = z.infer<typeof DeliveryValidator>;
