'use client';
import { useStoreReviewQuery } from '@/react-queries/useStoreReviewQuery';
import { dateFormatting } from '@/utils/date-formatting';
import { MessageSquare } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { LeaveStoreReviewModal } from './leave-store-review/leave-store-reviews-modal';
import { PaginationStoreReviews } from './pagination/pagination-store-reviews';
import { SkeletonStoreReviews } from './skeleton-store-reviews';
import styles from './store-review.module.css';

export const StoreReview = () => {
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
          {reviews.storeReviews?.map((review) => {
            return (
              <div
                className="grid grid-cols-3 gap-3 py-4  border-b border-slate-200 last:border-none "
                key={review.id}
              >
                <div className={styles.review_name_wrapper}>
                  <div className={styles.review_name}>{review.user.name}</div>
                  <div className={styles.review_date}>
                    {dateFormatting(String(review.createdAt))}
                  </div>
                </div>
                <div className={styles.review_content_wrapper}>
                  <div className={styles.review_content}>{review.content}</div>
                  {review.response ? (
                    <div className=" relative mt-2">
                      <MessageSquare className=" absolute top-1 fill-gray-400" />
                      <p className=" text-gray-400 ml-10 text-[13px] ">
                        {review.response}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
