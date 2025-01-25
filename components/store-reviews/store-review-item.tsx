import React from 'react';
import { MessageSquare } from 'lucide-react';
import styles from './store-review.module.css';
import { dateFormatting } from '@/utils/date-formatting';
import { StoreReviewType } from '@/types/stor_review_type';

export const StoreReviewItem = ({ review }: { review: StoreReviewType }) => {
  return (
    <div className="grid grid-cols-3 gap-3 py-4  border-b border-slate-200 last:border-none ">
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
};
