import { GetProductsType } from '../types/get_products_type';

export const getNowTrending = async (): Promise<GetProductsType> => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/product-filter?isBestseller=true`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const nowTrending = res.json();
  return nowTrending;
};
