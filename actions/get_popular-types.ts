import { PopularTypesType } from './../types/popular_types_type';

export const getPopularTypes = async (): Promise<PopularTypesType[]> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/popular`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const popularTypes = res.json();
  return popularTypes;
};
