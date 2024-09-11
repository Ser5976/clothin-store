export type StoreReviewType = {
  id: string;
  content: string;
  response: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    email: string | null;
    name: string | null;
  };
};

export type CommenTypeStoreReview = {
  storeReviews: StoreReviewType[];
  count: number;
  pageQty: number;
};
