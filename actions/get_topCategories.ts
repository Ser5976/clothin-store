import { TopCategoriesType } from './../types/topCategories_type';

export const getTopCategories = async (): Promise<
  TopCategoriesType[] | undefined
> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/top-categories`, {
      next: { revalidate: 60 },
    });
    return res.json();
  } catch (error) {
    console.log('error topcategories:', error);
  }
};
