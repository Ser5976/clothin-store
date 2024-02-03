import { z } from 'zod';

export const PopularTypesValidator = z.object({
  title: z.string().min(1, 'Title is required'),
  link: z.string().min(1, 'Name is required'),
  image: z.object({ url: z.string(), fileKey: z.string() }),
});

export type PopularTypesValidatorDataType = z.infer<
  typeof PopularTypesValidator
>;
