'use client';
import { useStoreReviewQuery } from '@/react-queries/useStoreReviewQuery';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { LeaveStoreReviewModal } from './leave-store-review/leave-store-reviews-modal';
import { PaginationStoreReviews } from './pagination/pagination-store-reviews';
import { SkeletonStoreReviews } from './skeleton-store-reviews';
import { StoreReviewItem } from './store-review-item';
import { StoreReviewItemAdmin } from './store-review-item-admin';
import styles from './store-review.module.css';

export const StoreReview = () => {
  const session = useSession();
  const admin = session.data?.user.role === 'ADMIN';
  //получаем параметры запроса
  const searchParams = useSearchParams();
  // кастомный хук useQuery
  const {
    data: reviews,
    isError,
    isLoading,
    refetch,
  } = useStoreReviewQuery(searchParams);
  useEffect(() => {
    refetch();
  }, [searchParams]);
  return (
    <div className="shared_container flex flex-col  gap-2">
      <p className={styles.title}>Store reviews</p>
      <div className="  text-gray-600 text-[10px] md:text-[12px] lg:text-[15px] max-w-[300px]">
        Dear customers! Thank you for using our services. Your opinion about our
        work is important to us! To simply share your impressions about our
        work, click the button below.
      </div>
      <LeaveStoreReviewModal />
      <PaginationStoreReviews pageQty={reviews?.pageQty} />
      {isError ? (
        <div className=" text-lg text-red-500">What went wrong!</div>
      ) : isLoading ? (
        <SkeletonStoreReviews />
      ) : reviews.storeReviews?.length === 0 ? (
        <div className="">There are no store reviews</div>
      ) : (
        <div className=" flex flex-col">
          {reviews.storeReviews.map((review) => {
            return admin ? (
              <StoreReviewItemAdmin key={review.id} review={review} />
            ) : (
              <StoreReviewItem key={review.id} review={review} />
            );
          })}
        </div>
      )}
    </div>
  );
};
