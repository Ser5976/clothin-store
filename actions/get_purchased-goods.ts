import { ProductType } from '@/types/product_type';

export const getPurchasedGoods = async (): Promise<ProductType[] | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/purchased-goods`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    //throw new Error('Failed to fetch data');
    return null;
  }
  const products = res.json();
  return products;
};
