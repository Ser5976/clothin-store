import { RatingType } from '@/types/rating_type';

import axios from 'axios';

export const getRatingProductServise = async (productId: string) => {
  const { data } = await axios.get<RatingType>(`/api/rating/${productId}`);
  return data;
};
