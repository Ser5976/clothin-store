import { ProductType } from '@/types/product_type';
import { FC } from 'react';
import styles from './product-details.module.css';

type ProductDetailsProps = {
  product: ProductType;
};

export const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  return <div className={styles.container}>{product.description}</div>;
};
