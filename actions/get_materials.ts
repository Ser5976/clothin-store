import { GeneralMaterialType } from './../types/general-material_type';

export const getMaterials = async (): Promise<
  GeneralMaterialType | undefined
> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/material`, {
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
