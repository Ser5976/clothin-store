import { ProductType } from '@/types/product_type';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC } from 'react';
import { BadgeFavourites } from './badge-favourites';
import styles from './card-product.module.css';
// это чтобы конфликта с сервером не было(динамический роут)
const RatingStar = dynamic(() => import('./rating-star'), {
  ssr: false,
});

type CardProductProps = {
  product: ProductType;
};

export const CardProduct: FC<CardProductProps> = ({ product }) => {
  return (
    <div className={styles.wrapper_cart}>
      <div className={styles.header}>
        <div className={styles.rating}>
          <RatingStar rating={product.rating} />
        </div>
        <div className={styles.badge_favourites}>
          <BadgeFavourites productId={product.id} />
        </div>
        <Image
          className={styles.img_product}
          src={product.image[0].url}
          width={200}
          height={245}
          alt="Picture of the author"
          priority
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.name_product}>{product.name}</div>
        <div className={styles.price_product}>
          <div className={styles.price}>${product.price}</div>
          {product.oldPrice ? (
            <div className={styles.old_price}>${product.oldPrice}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
