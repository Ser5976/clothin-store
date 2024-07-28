import { CategoryType } from '@/types/category_type';

export const getCategories = async (): Promise<CategoryType[]> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/category`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const categories = res.json();
  return categories;
};
