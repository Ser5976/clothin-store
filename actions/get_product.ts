import { ProductType } from '@/types/product_type';

export const getProduct = async (productId: string): Promise<ProductType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/${productId}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const product = res.json();
  return product;
};
