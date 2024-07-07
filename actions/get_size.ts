import { SizeType } from '@/types/size_type';

export const getSizes = async (): Promise<SizeType[]> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/size`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const sizes = res.json();
  return sizes;
};
