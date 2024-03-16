import { RatingType } from '@/types/rating_type';
import dynamic from 'next/dynamic';
import React, { FC, memo } from 'react';
import styles from './product-sidebar.module.css';

// это чтобы конфликта с сервером не было(динамический роут)
const RatingStar = dynamic(
  () => import('./../../../../ui/custom-ui/rating-star/rating-star'),
  {
    ssr: false,
  }
);

type PriceRatingProps = {
  price: string;
  oldPrice: null | string;
  discount: null | string;
  rating: RatingType | null;
};

// здесь мы сделали оптимизацию при помощи React.memo,чтобы избежать ненужных рендеренгов,
//т.к. в родители есть useState
const PriceRating: FC<PriceRatingProps> = ({
  price,
  oldPrice,
  discount,
  rating,
}) => {
  console.log('render price-rating');
  return (
    <div className="flex justify-between  w-full">
      <div className="flex items-baseline">
        <div className={styles.price}>${price}</div>
        {oldPrice && discount && (
          <div className={styles.oldPrice_discount}>
            <div className={styles.oldPrice}>${oldPrice}</div>
            <div className={styles.discount}>
              <div className={styles.discount_text}>-{discount}%</div>
            </div>
          </div>
        )}
      </div>
      <div className=" flex flex-col">
        <RatingStar rating={rating} size="big" />
        {rating?.value ? (
          <div className={styles.number_reviews}>{rating.count} Reviews</div>
        ) : (
          <div className={styles.number_reviews}>Estimation:0</div>
        )}
      </div>
    </div>
  );
};

export default memo(PriceRating);
