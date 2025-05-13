import { z } from 'zod';
export const FormSchema = z.object({
  email: z.string().email('Invalid email').min(2, 'Email is required'),
  phone: z.string().min(1, 'Phone is required'),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'LastName is required'),
  country: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  street: z.string().min(1, 'Street is required'),
  house: z.string().min(1, 'House is required'),
  flat: z.string().optional(),
  postalCode: z.string().optional(),
  type: z.string(),
});
export type FormSchemaType = z.infer<typeof FormSchema>;
