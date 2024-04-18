import axios from 'axios';

export const postDislikeReviewServise = async (obj: { reviewId: string }) => {
  const { data } = await axios.post('/api/dislike-review', obj);
  return data;
};
