import { TypeCollection } from './../types/type_collection';

export const getCollections = async (): Promise<TypeCollection[]> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/collection`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const collections = res.json();
  return collections;
};
