import { useProductReviewsStore } from '@/stores/useProductReviewsStore';
import { useStore } from 'zustand';
import styles from './product-reviews.module.css';

export const ProductReviews = () => {
  const { reviews } = useStore(useProductReviewsStore, (state) => state);
  return (
    <div className={styles.container}>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          return (
            <div key={review.id} className="mr-2">
              {review.name} {review.estimation}
            </div>
          );
        })
      ) : (
        <div className=" text-lg text-red-500">What went wrong</div>
      )}
    </div>
  );
};
