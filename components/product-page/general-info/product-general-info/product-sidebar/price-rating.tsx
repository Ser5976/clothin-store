import RatingSkeleton from '@/components/ui/custom-ui/rating-star/rating-skeleton';
import { useRatingProductQuery } from '@/react-queries/useRatingProductQuery ';
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
  productId: string;
};

// здесь мы сделали оптимизацию при помощи React.memo,чтобы избежать ненужных рендеренгов,
//т.к. в родители есть useState
const PriceRating: FC<PriceRatingProps> = ({
  price,
  oldPrice,
  discount,
  productId,
}) => {
  console.log('render price-rating');
  //получаем данные по рейтингу из базы отдельным запросом, при помощи кастомного хука(для useQuery)
  //это нужно для интерактива на клиенте
  const { data, isLoading, isError } = useRatingProductQuery(productId);

  return (
    <div className=" relative flex justify-between  w-full">
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

      {isError ? (
        <div className=" text-red-500 flex flex-col">
          <div>Rating</div>
          <div>data not received</div>
        </div>
      ) : isLoading ? (
        <RatingSkeleton className="absolute top-0 right-0" />
      ) : (
        <RatingStar
          rating={data}
          size="big"
          estimation
          className="absolute top-0 right-0"
        />
      )}
    </div>
  );
};

export default memo(PriceRating);
