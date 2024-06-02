import Pagination from '@/components/ui/custom-ui/pagination/pagination';
import { useEstimationProductQuery } from '@/react-queries/useEstimationProductQuery';
import { useReviewsProductQuery } from '@/react-queries/useReviewsProductQuery';
import { ProductType } from '@/types/product_type';
import { FC, useState } from 'react';
import ProductCardMini from '../product-card-mini/product-card-mini';
import EvaluationAnalytics from './evaluation-analytics';
import { Reviews } from './reviews';
import ReviewsInfo from './reviews-info';
import ReviewsToolbar from './reviews-toolbar';

type ProductReviewsProps = {
  product: ProductType;
};

export const ProductReviews: FC<ProductReviewsProps> = ({ product }) => {
  //получаем данные по рейтингу из базы отдельным запросом, при помощи кастомного хука(для useQuery)
  //это нужно для интерактива на клиенте
  const {
    refetch: refetchEstimation,
    data: estimations,
    isLoading: isLoadingEstimation,
    isError: isErrorEstimation,
  } = useEstimationProductQuery(product.id);

  //console.log('estimations:', estimations);
  //состояние для сортировки
  const [sort, setSort] = useState(() => ({
    oldest: false,
    rating: false,
    reset: false,
    page: 1,
  }));
  //console.log('sort:', sort);
  //получаем отсортированные данные по отзывам отдельным запросом ,при помощи кастомного хука, для useQuery, useReviewsProductQuery
  // это нужно для интерактива на клиенте, для получения количества отзывов
  const {
    refetch: refetchReviws,
    data,
    isError: isErrorReviws,
    isLoading: isLoadingReviews,
  } = useReviewsProductQuery(product.id, sort);

  return (
    <div className="flex justify-between gap-[25px]">
      <div className=" flex flex-col grow  max-w-[780px]  ">
        <div className=" flex gap-[20px]  justify-between  max-sm:flex-col mb-[100px] max-md:mb-[65px] ">
          <ReviewsInfo
            productId={product.id}
            isLoadingEstimation={isLoadingEstimation}
            isErrorEstimation={isErrorEstimation}
            positevePercentage={estimations?.positevePercentage}
            positiveEstimation={estimations?.positiveEstimation}
            totalRatings={estimations?.totalRatings}
            quantityReviews={data?.count}
          />
          <EvaluationAnalytics
            estimations={estimations}
            isLoadingEstimation={isLoadingEstimation}
            isErrorEstimation={isErrorEstimation}
          />
        </div>
        <ReviewsToolbar
          setSort={setSort}
          productId={product.id}
          refetchEstimation={refetchEstimation}
          refetchReviews={refetchReviws}
        />
        <Reviews
          reviews={data?.reviews}
          isLoadingReviews={isLoadingReviews}
          isErrorReviews={isErrorReviws}
        />
        {data && data.pageQty > 1 && (
          <Pagination
            page={sort.page}
            pageQty={data?.pageQty}
            setSort={setSort}
          />
        )}
      </div>
      <div className="w-[300px]  max-xl:max-w-[250px] max-lg:w-[200px] max-[822px]:hidden">
        <ProductCardMini product={product} />
      </div>
    </div>
  );
};
