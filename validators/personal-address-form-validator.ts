import { z } from 'zod';
export const PersonalAddressFormValidator = z.object({
  country: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  street: z.string().min(1, 'Street is required'),
  house: z.string().min(1, 'House is required'),
  flat: z.string().optional(),
  postalCode: z.string().optional(),
});
export type PersonalAddressFormType = z.infer<
  typeof PersonalAddressFormValidator
>;
