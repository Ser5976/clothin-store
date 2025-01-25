import { StoreReviewDataType } from '../../validators/store-review-validator';
import axios from 'axios';

export const updateStoreReviewServise = async (dataStoreReview: {
  id: string;
  storeReview: StoreReviewDataType;
}) => {
  const { data } = await axios.patch(
    `/api/store-review/${dataStoreReview.id}`,
    dataStoreReview.storeReview
  );
  return data;
};
