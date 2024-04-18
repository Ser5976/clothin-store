import { TypeVoteReviews } from './type_vote_reviews';

export type TypeReviews = {
  id: string;
  name: string;
  content: string;
  response: string;
  estimation: number;
  userId: string;
  productId: string;
  likeReview: TypeVoteReviews[];
  dislikeReview: TypeVoteReviews[];
  createdAt: string;
  updatedAt: string;
};

export type CommenTypeReviews = {
  reviews: TypeReviews[];
  count: number;
  pageQty: number;
};
