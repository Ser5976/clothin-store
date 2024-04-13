import { useEstimationProductQuery } from '@/react-queries/useEstimationProductQuery';
import { ProductType } from '@/types/product_type';
import { FC } from 'react';
import { ProductCardMini } from '../product-card-mini/product-card-mini';
import { EvaluationAnalytics } from './evaluation-analytics';
import { Reviews } from './reviews';
import { ReviewsInfo } from './reviews-info';

type ProductReviewsProps = {
  product: ProductType;
};

export const ProductReviews: FC<ProductReviewsProps> = ({ product }) => {
  //получаем данные по рейтингу из базы отдельным запросом, при помощи кастомного хука(для useQuery)
  //это нужно для интерактива на клиенте
  const { data, isLoading, isError } = useEstimationProductQuery(product.id);

  return (
    <div className="flex justify-between gap-[15px]">
      <div className=" flex flex-col grow  max-w-[780px]">
        <div className=" flex gap-[15px]  justify-between mb-[10%] max-sm:flex-col">
          <ReviewsInfo
            productId={product.id}
            isLoadingEstimation={isLoading}
            isErrorEstimation={isError}
            positevePercentage={data?.positevePercentage}
            positiveEstimation={data?.positiveEstimation}
            totalRatings={data?.totalRatings}
          />
          <EvaluationAnalytics
            estimations={data}
            isLoadingEstimation={isLoading}
            isErrorEstimation={isError}
          />
        </div>
        <Reviews />
      </div>
      <div className=" grow max-w-[300px] max-xl:max-w-[250px] max-lg:max-w-[200px] max-[822px]:hidden">
        <ProductCardMini product={product} />
      </div>
    </div>
  );
};
