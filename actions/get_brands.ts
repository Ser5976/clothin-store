import { GeneralBrandType } from '@/types/general-brand_type';

export const getBrands = async (): Promise<GeneralBrandType | undefined> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/brand`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return undefined;
  }
  const brands = res.json();
  return brands;
};
