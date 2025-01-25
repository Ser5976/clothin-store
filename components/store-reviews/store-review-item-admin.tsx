import React from 'react';
import { MessageSquare, Trash } from 'lucide-react';
import styles from './store-review.module.css';
import { dateFormatting } from '@/utils/date-formatting';
import { StoreReviewType } from '@/types/stor_review_type';
import { ResponseStoreReviewModal } from './response-store-review/response-store-reviews-modal';
import { useStoreReviewDelete } from '@/react-queries/useStoreReviewDelete';

export const StoreReviewItemAdmin = ({
  review,
}: {
  review: StoreReviewType;
}) => {
  //удаление отзыва магазина
  const mutationStoreRiviewDelete = useStoreReviewDelete();
  const deleteStoreReview = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete review ${review.user.name}`
    );
    if (userConfirmed) {
      mutationStoreRiviewDelete.mutate(review.id);
    }
  };
  return (
    <div className="grid grid-cols-4 gap-3 py-4  border-b border-slate-200 last:border-none ">
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
      <div className=" flex gap-2 col-span-1 justify-end">
        <ResponseStoreReviewModal review={review} />
        <Trash
          onClick={deleteStoreReview}
          color="#4b5563"
          className=" w-4 h-4 sm:w-6 sm:h-6  cursor-pointer"
        />
      </div>
    </div>
  );
};
