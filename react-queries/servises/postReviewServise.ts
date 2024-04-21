import { ReviewDataType } from './../../validators/review-validator';
import axios from 'axios';

export const postReviewServise = async (obj: ReviewDataType) => {
  const { data } = await axios.post('/api/review', obj);
  return data;
};
