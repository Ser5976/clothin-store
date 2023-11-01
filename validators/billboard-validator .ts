import { z } from 'zod';

export const BillboardValidator = z.object({
  label: z.string().min(1, 'Label is required'),
  imageUrl: z.string().min(1, 'ImgUrl is required'),
});

export type BillboardDataType = z.infer<typeof BillboardValidator>;
