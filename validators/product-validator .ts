import { z } from 'zod';

export const ProductValidator = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z
    .number({ required_error: 'Price is required' })
    .positive('The number must be greater bthan 0'),
  oldPrice: z.number().positive().optional(),
  description: z.string().optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  isBestseller: z.boolean().default(false).optional(),
  image: z
    .object({ url: z.string(), fileKey: z.string() })
    .array()
    .nonempty('Image is required'),
  categoryId: z.string().min(1, 'Category is required'),
  typeId: z.string().min(1, 'Type is required'),
  sizeId: z.string().min(1, 'Size is required'),
  colorId: z.string().min(1, 'Color is required'),
  materialId: z.string().min(1, 'Material is required'),
  brandId: z.string().min(1, 'Brand is required'),
});

export type ProductDataType = z.infer<typeof ProductValidator>;
