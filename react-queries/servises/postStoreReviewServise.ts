import { StoreReviewDataType } from './../../validators/store-review-validator';
import axios from 'axios';

export const postStoreReviewServise = async (obj: StoreReviewDataType) => {
  const { data } = await axios.post('/api/store-review', obj);
  return data;
};
