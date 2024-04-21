import { TypeReviews } from '@/types/type_reviews';
import { dateFormatting } from '@/utils/date-formatting';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC } from 'react';
import VoteReview from './vote_review';
import styles from './product-reviews.module.css';
import { SkeletonReviews } from './skeleton-reviews';

// это чтобы конфликта с сервером не было(динамический роут)
const RatingStar = dynamic(
  () => import('@/components/ui/custom-ui/rating-star/rating-star'),
  {
    ssr: false,
  }
);

type ReviewsType = {
  reviews: TypeReviews[] | undefined;
  isLoadingReviews: boolean;
  isErrorReviews: boolean;
};

export const Reviews: FC<ReviewsType> = ({
  reviews,
  isErrorReviews,
  isLoadingReviews,
}) => {
  const rrr = true;
  const lll = true;
  return (
    <div className={styles.container}>
      {isErrorReviews ? (
        <div className=" text-lg text-red-500">What went wrong</div>
      ) : isLoadingReviews ? (
        <SkeletonReviews />
      ) : reviews?.length === 0 ? (
        <div className="">There are no product reviews</div>
      ) : (
        <div className=" flex flex-col">
          {reviews?.map((review) => {
            return (
              <div
                className="grid grid-cols-3 gap-3 py-4  border-b border-slate-200 last:border-none "
                key={review.id}
              >
                <div className={styles.review_name_wrapper}>
                  <div className={styles.review_name}>{review.name}</div>
                  <div className={styles.review_date}>
                    {dateFormatting(review.createdAt)}
                  </div>
                  <div className={styles.review_rating}>
                    <RatingStar
                      size="middle"
                      rating={{ value: review.estimation, count: 0 }}
                    />
                  </div>
                </div>
                <div className={styles.review_content_wrapper}>
                  <div className={styles.review_content}>{review.content}</div>
                  <div className={styles.review_vote}>
                    <VoteReview reviewId={review.id} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
