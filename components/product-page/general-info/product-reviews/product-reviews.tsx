import { ProductType } from '@/types/product_type';
import { FC } from 'react';
import { ProductCardMini } from '../product-card-mini/product-card-mini';
import styles from './product-reviews.module.css';
import { Reviews } from './reviews';

type ProductReviewsProps = {
  product: ProductType;
};

export const ProductReviews: FC<ProductReviewsProps> = ({ product }) => {
  return (
    <div className="grid grid-cols-4 max-md:grid-cols-3 ">
      <div className=" flex flex-col col-span-3 max-md:col-span-2">
        <Reviews />
      </div>
      <ProductCardMini product={product} />
    </div>
  );
};
