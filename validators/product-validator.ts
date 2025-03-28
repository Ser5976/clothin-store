import { z } from 'zod';

export const ProductValidator = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.string({ required_error: 'Price is required' }),
  oldPrice: z.string().optional(),
  description: z.string().optional(),
  isFeatured: z.boolean().default(false).optional(),
  isAvailability: z.boolean().default(true).optional(),
  isBestseller: z.boolean().default(false).optional(),
  image: z
    .object({ url: z.string(), fileKey: z.string() })
    .array()
    .nonempty('Image is required'),
  categoryId: z.string().min(1, 'Category is required'),
  typeId: z.string().min(1, 'Type is required'),
  sizeId: z.array(z.string()).nonempty('Size is required'),
  colorId: z.string().array().nonempty('Color is required'),
  materialId: z.string().min(1, 'Material is required'),
  brandId: z.string().min(1, 'Brand is required'),
});

export type ProductDataType = z.infer<typeof ProductValidator>;
