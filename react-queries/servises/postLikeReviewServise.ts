import axios from 'axios';

export const postLikeReviewServise = async (obj: { reviewId: string }) => {
  const { data } = await axios.post('/api/like-review', obj);
  return data;
};
