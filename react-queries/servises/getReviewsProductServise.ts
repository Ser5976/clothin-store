import { CommenTypeReviews } from './../../types/type_reviews';
import axios from 'axios';

export type SortType = {
  oldest: boolean;
  rating: boolean;
  reset: boolean;
  page?: number;
};

export const getReviewsProductServise = async (
  productId: string,
  sort: SortType
) => {
  const { data } = await axios.post<CommenTypeReviews>(
    `/api/review/${productId}`,
    sort
  );
  return data;
};
