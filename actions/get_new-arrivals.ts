import { GetProductsType } from '../types/get_products_type';

export const getNewArrivals = async (): Promise<GetProductsType | null> => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/product-filter?limit=30`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return null;
  }
  const newArrivals = res.json();
  return newArrivals;
};
