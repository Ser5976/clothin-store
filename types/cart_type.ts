export type CartItemType = {
  id?: string;
  productId: string;
  name: string;
  price: number;
  oldPrice: number | null;
  totalPrice: number;
  totalOldPrice: number;
  discount: number | null;
  image: string;
  quantity: number;
  size: string;
  color: string;
};

export type CartType = {
  items: CartItemType[];
  id: string;
  userId: string;
};
export type CommonCartType = {
  cart: CartType | null;
  sumTotalPrice: number | undefined;
  sumTotalOldPrice: number | undefined;
};
