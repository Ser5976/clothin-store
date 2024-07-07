import { ColorType } from '@/types/color_type';

export const getColors = async (): Promise<ColorType[]> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/color`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const colors = res.json();
  return colors;
};
