import { SizeType } from '@/types/size_type';

export const getSizes = async (): Promise<SizeType[] | undefined> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/size`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return undefined;
  }
  const sizes = res.json();
  return sizes;
};
