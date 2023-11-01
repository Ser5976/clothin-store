import { z } from 'zod';

export const AnswerValidator = z.object({
  response: z.string().min(1, 'Response is required'),
});

export type AnswerDataType = z.infer<typeof AnswerValidator>;
