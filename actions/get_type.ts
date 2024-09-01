import { TypeType } from '../types/type_type';

export const getTypes = async (): Promise<TypeType[] | undefined> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/type`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return undefined;
  }
  const types = res.json();
  return types;
};
