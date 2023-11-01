import { z } from 'zod';

export const EstimationValidator = z.object({
  value: z
    .number({ required_error: 'Value is required' })
    .min(1, 'The rating can not be less than 1')
    .max(5, 'The rating can not be more than 5'),

  userId: z.string().min(1, 'UaerId is required'),
  productId: z.string().min(1, 'Product is required'),
});

export type EstimationDataType = z.infer<typeof EstimationValidator>;
