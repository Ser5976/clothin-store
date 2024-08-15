import styles from './write-to-us.module.css';
import { CustomButton } from '@/components/ui/custom-ui/custom-button/custom-button';
import Image from 'next/image';
import { StoreReviewType } from '@/types/stor_review_type';
import { FC } from 'react';
import { dateFormatting } from '@/utils/date-formatting';

type WriteToUsPropsType = {
  reviews: StoreReviewType;
};

export const WriteToUs: FC<WriteToUsPropsType> = ({ reviews }) => {
  return (
    <section className={styles.section}>
      <div className="shared_container">
        <div className={styles.wrapper}>
          <div className={styles.content_wrapper}>
            <p className={styles.title}>Write to Us</p>
            <p className={styles.subtitle}>Last review</p>
            <div>
              <div className={styles.name}>
                {reviews?.user.name ?? reviews?.user.email}
              </div>
              <div className={styles.date}>
                {dateFormatting(String(reviews?.createdAt))}
              </div>
            </div>

            <div className={styles.content}>{reviews?.content}</div>
            <CustomButton className="mt-[3%]">
              Go to the reviews page
            </CustomButton>
          </div>
          <div className={styles.imag}>
            <Image
              src="/home/letters.png"
              alt="image letters"
              width={461}
              height={416}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
