import { z } from 'zod';

export const CollectionValidator = z.object({
  name: z.string().min(1, 'name is required'),
  description: z.string().min(1, 'name is required'),
  image: z.object({ url: z.string(), fileKey: z.string() }),
  collectionItem: z.array(
    z.object({
      productId: z.string().min(1, 'ProductId is required'),
    })
  ),
});

export type CollectionDataType = z.infer<typeof CollectionValidator>;
