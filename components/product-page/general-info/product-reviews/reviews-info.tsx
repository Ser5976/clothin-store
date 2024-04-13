import RatingSkeleton from '@/components/ui/custom-ui/rating-star/rating-skeleton';
import { useRatingProductQuery } from '@/react-queries/useRatingProductQuery ';
import { useProductReviewsStore } from '@/stores/useProductReviewsStore';
import { RotateCw } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { useStore } from 'zustand';
import styles from './product-reviews.module.css';
// это чтобы конфликта с сервером не было(динамический роут)
const RatingStar = dynamic(
  () => import('@/components/ui/custom-ui/rating-star/rating-star'),
  {
    ssr: false,
  }
);

type ReviewsInfoProps = {
  productId: string;
  isLoadingEstimation: boolean;
  isErrorEstimation: boolean;
  positiveEstimation: number | undefined;
  totalRatings: number | undefined;
  positevePercentage: number | undefined;
};

export const ReviewsInfo: FC<ReviewsInfoProps> = ({
  productId,
  isLoadingEstimation,
  isErrorEstimation,
  positiveEstimation,
  totalRatings,
  positevePercentage,
}) => {
  const { reviews } = useStore(useProductReviewsStore, (state) => state);
  //получаем данные по рейтингу из базы отдельным запросом, при помощи кастомного хука(для useQuery)
  //это нужно для интерактива на клиенте
  const {
    data,
    isLoading: isLoadingRating,
    isError: isErrorRating,
  } = useRatingProductQuery(productId);
  const islod = true;
  const iser = true;
  return (
    <div className={styles.reviews_info}>
      <div className={styles.reviews_info_title}>
        {reviews.length > 0 ? reviews.length : 0} reviews
      </div>
      <div>
        <div className=" w-[90px] ">
          {isErrorRating ? (
            <div className=" text-red-500 text-xs  flex flex-col">
              <div>Rating data not received</div>
            </div>
          ) : isLoadingRating ? (
            <RatingSkeleton />
          ) : (
            <RatingStar rating={data} size="big" estimation />
          )}
        </div>
      </div>
      <div className={styles.reviews_info_subtitle}>
        <div>
          {isErrorEstimation ? (
            <div>
              {' '}
              <span className={styles.reviews_info_error}> ? </span> out of{' '}
              <span className={styles.reviews_info_error}> ? </span> (
              <span className={styles.reviews_info_error}> ? % </span>)
            </div>
          ) : isLoadingEstimation ? (
            <div className="flex gap[2px] items-center">
              <RotateCw
                size={12}
                color="#808080"
                strokeWidth={1}
                absoluteStrokeWidth
                className="  animate-spin"
              />
              <span> out of </span>
              <RotateCw
                size={12}
                color="#808080"
                strokeWidth={1}
                absoluteStrokeWidth
                className="  animate-spin"
              />
              ({' '}
              <RotateCw
                size={12}
                color="#808080"
                strokeWidth={1}
                absoluteStrokeWidth
                className="  animate-spin"
              />{' '}
              )
            </div>
          ) : (
            <div>
              {positiveEstimation} out of {totalRatings} ({positevePercentage}%)
            </div>
          )}
        </div>
        <div>Customers recommended this product</div>
      </div>
    </div>
  );
};
