import { BrandType } from '@/types/brand_type';

export const getBrands = async (): Promise<BrandType[]> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/brand`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const brands = res.json();
  return brands;
};
