import { StoreReviewType } from './../types/stor_review_type';

export const getSoreReviews = async (): Promise<StoreReviewType[]> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/store-review`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const storeReviews = res.json();
  return storeReviews;
};
