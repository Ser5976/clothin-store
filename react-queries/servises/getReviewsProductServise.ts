import { TypeReviews } from './../../types/type_reviews';
import axios from 'axios';

export const getReviewsProductServise = async (productId: string) => {
  const { data } = await axios.get<TypeReviews[]>(`/api/review/${productId}`);
  return data;
};
