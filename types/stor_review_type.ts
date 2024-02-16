export type StoreReviewType = {
  id: string;
  content: string;
  response: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    email: string;
    name: string;
  };
};
