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

/* const storeReviews: ({
  user: {
      email: string | null;
      name: string | null;
  };
} & {
  id: string;
  content: string;
  response: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
})[]
 */
