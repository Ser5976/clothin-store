import { CartDataType } from '@/validators/cart-validator';

export type CartType = {
  items: CartDataType;
  id: string;
  userId: string;
};
export type CommonCartType = {
  cart: CartType | null;
  sumTotalPrice: number | undefined;
  sumTotalOldPrice: number | undefined;
};
