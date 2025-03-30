import { DeliveryType } from '@/types/delivery_type';

export const getDelivery = async (): Promise<DeliveryType[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/delivery`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const delivery = res.json();
  return delivery;
};
