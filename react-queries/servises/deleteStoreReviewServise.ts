import axios from 'axios';

export const deleteStoreReviewServise = async (storeReviewId: string) => {
  const data = await axios.delete(`/api/store-review/${storeReviewId}`);
  return data;
};
