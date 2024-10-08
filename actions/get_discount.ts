import { GetProductsType } from '../types/get_products_type';

export const getDiscount = async (): Promise<GetProductsType | null> => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/product-filter?discount=true`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return null;
  }
  const discount = res.json();
  return discount;
};
