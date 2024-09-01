import { MaterialType } from '@/types/material_type';

export const getMaterials = async (): Promise<MaterialType[] | undefined> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/material`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return undefined;
  }
  const materials = res.json();
  return materials;
};
