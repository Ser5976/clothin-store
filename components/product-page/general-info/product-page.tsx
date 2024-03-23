'use client';
import { useProductMenuStore } from '@/stores/useProductMenuStore';
import useStore from '@/stores/useStore';
import { DeliveryType } from '@/types/delivery_type';
import { ProductType } from '@/types/product_type';
import { FC } from 'react';
import { ProductDetails } from './product-details/product-details';
import { ProductGeneralInfo } from './product-general-info/product-general-info';
import { ProductReviews } from './product-reviews/product-reviews';

type ProductPageProps = {
  product: ProductType;
  delivery: DeliveryType[];
};

export const ProductPage: FC<ProductPageProps> = ({ product, delivery }) => {
  //получение данных menuActive из стора,для навигации
  const state = useStore(useProductMenuStore, (state) => state);

  // выполняем условие какой компанент визуализировать
  if ('general-info' === state?.menuActive) {
    return (
      <div className="py-[2.5%]">
        <ProductGeneralInfo product={product} delivery={delivery} />
      </div>
    );
  }
  if ('product-details' === state?.menuActive) {
    return (
      <div className="py-[2.5%]">
        <ProductDetails product={product} />
      </div>
    );
  }
  if ('reviews' === state?.menuActive) {
    return (
      <div className="py-[2.5%]">
        <ProductReviews />
      </div>
    );
  }

  return (
    <div className="py-[2.5%]">
      <ProductGeneralInfo product={product} delivery={delivery} />
    </div>
  );
};
