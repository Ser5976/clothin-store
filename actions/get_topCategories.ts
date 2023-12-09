import { TopCategoriesType } from './../types/topCategories_type';

export const getTopCategories = async (): Promise<TopCategoriesType[]> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/top-categories`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
