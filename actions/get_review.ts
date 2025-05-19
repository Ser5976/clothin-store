import { TypeReviews } from '@/types/type_reviews';

export const getReviews = async (productId: string): Promise<TypeReviews[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/review/${productId}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const reviews = res.json();
  return reviews;
};
