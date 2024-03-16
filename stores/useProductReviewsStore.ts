import { TypeReviews } from './../types/type_reviews';
import { create } from 'zustand';

export type ProductReviewsStoreType = {
  reviews: TypeReviews[];
  setProductReviews: (data: TypeReviews[]) => void;
};

export const useProductReviewsStore = create<ProductReviewsStoreType>(
  (set) => ({
    reviews: [],
    setProductReviews: (data) => set((state) => ({ ...state, reviews: data })),
  })
);
