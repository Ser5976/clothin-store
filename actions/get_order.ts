import { OrderType } from './../types/order_type';

export const getOrder = async (orderId: string): Promise<OrderType> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/order/${orderId}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const order = res.json();
  return order;
};
