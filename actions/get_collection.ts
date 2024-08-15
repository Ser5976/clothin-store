import { TypeCollection } from '../types/type_collection';

export const getCollection = async (id: string): Promise<TypeCollection> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/collection/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const collection = res.json();
  return collection;
};
