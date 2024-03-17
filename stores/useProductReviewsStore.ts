import { TypeReviews } from './../types/type_reviews';
import { create } from 'zustand';

export type ProductReviewsStoreType = {
  reviews: TypeReviews[];
  error: boolean;
  setProductReviews: (data: TypeReviews[]) => void;
  setError: (data: boolean) => void;
};

export const useProductReviewsStore = create<ProductReviewsStoreType>(
  (set) => ({
    reviews: [],
    error: false,
    setProductReviews: (data) => set((state) => ({ ...state, reviews: data })),
    setError: (data) => set((state) => ({ ...state, error: data })),
  })
);
