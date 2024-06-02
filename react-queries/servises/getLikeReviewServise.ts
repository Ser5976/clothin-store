import { TypeVoteReviews } from './../../types/type_vote_reviews';
import axios from 'axios';

export const getLikeReviewServise = async (reviewId: string) => {
  const { data } = await axios.get<TypeVoteReviews[]>(
    `/api/like-review/${reviewId}`
  );
  return data;
};
