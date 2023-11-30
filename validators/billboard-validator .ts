import { z } from 'zod';

export const BillboardValidator = z.object({
  title: z.string().optional(),
  subTitle: z.string().optional(),
  link: z.string().min(1, 'Name is required'),
  image: z.object({ url: z.string(), fileKey: z.string() }),
});

export type BillboardDataType = z.infer<typeof BillboardValidator>;
