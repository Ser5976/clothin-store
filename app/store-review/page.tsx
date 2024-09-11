import { BreadcrumbStoreReviews } from '@/components/store-reviews/breadcrumb-store-reviews';
import { StoreReview } from '@/components/store-reviews/store-review';

const StoreReviewPage = () => {
  return (
    <main className="min-h-screen">
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <BreadcrumbStoreReviews />
        </div>
      </div>
      <StoreReview />;
    </main>
  );
};
export default StoreReviewPage;
