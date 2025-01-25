import { z } from 'zod';

export const StoreResponseValidator = z.object({
  response: z.string(),
});

export type StoreResponseDataType = z.infer<typeof StoreResponseValidator>;
