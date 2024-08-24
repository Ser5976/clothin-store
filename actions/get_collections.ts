import { TypeCollection } from './../types/type_collection';

export const getCollections = async (): Promise<TypeCollection[] | null> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/collection`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return null;
  }
  const collections = res.json();
  return collections;
};
