import { TypeVoteReviews } from '../../types/type_vote_reviews';
import axios from 'axios';

export const getDislikeReviewServise = async (reviewId: string) => {
  const { data } = await axios.get<TypeVoteReviews[]>(
    `/api/dislike-review/${reviewId}`
  );
  return data;
};
