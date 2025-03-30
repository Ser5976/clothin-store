import { ProductType } from '@/types/product_type';

export const getAllProducts = async (): Promise<ProductType[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/product`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const products = res.json();
  return products;
};
