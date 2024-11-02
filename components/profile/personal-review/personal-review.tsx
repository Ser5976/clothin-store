import { StoreReviewType } from '@/types/stor_review_type';
import { TypeReviews } from '@/types/type_reviews';
import ProductReviews from './product-reviews/product-reviews';
import StoreReviews from './store-reviews/store-reviews';

const PersonalReview = ({
  productReviews,
  storeReviews,
}: {
  productReviews: TypeReviews[] | undefined;
  storeReviews: StoreReviewType[] | undefined;
}) => {
  return (
    <main>
      <ProductReviews productReviews={productReviews} />
      <StoreReviews storeReviews={storeReviews} />
    </main>
  );
};

export default PersonalReview;
