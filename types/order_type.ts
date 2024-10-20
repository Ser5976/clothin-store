export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  image: string;
  quantity: number;
  size: string;
  color: string;
  totalPrice: number;
  totalOldPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderType = {
  id: string;
  userId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  isPaid: boolean;
  subtotal: number;
  shippingCost: number;
  discount: number | null;
  amount: Number;
  phone: string;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
};
