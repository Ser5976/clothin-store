import { ColorType } from '@/types/color_type';

export const getColors = async (): Promise<ColorType[] | undefined> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/color`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    //throw new Error('Failed to fetch data');
    return undefined;
  }
  const colors = res.json();
  return colors;
};
