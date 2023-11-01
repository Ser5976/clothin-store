import { z } from 'zod';

export const ColorValidator = z.object({
  name: z.string(),
  value: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: 'String must be a valid hex code',
    }),
});

export type ColorDataType = z.infer<typeof ColorValidator>;
