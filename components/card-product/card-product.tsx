import { ProductType } from '@/types/product_type';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, memo } from 'react';
import { BadgeFavourites } from '../bage-favourites.tsx/badge-favourites';
import { BageDiscount } from './badge-discount';

import styles from './card-product.module.css';
// это чтобы конфликта с сервером не было(динамический роут)
const RatingStar = dynamic(
  () => import('../ui/custom-ui/rating-star/rating-star'),
  {
    ssr: false,
  }
);

type CardProductProps = {
  product: ProductType;
};
// здесь мы сделали оптимизацию при помощи React.memo,на всякий случай, если в компоненте,
//где будет использоваться CardProduct, будут дополнительные причины для повторного рендеренга
const CardProduct: FC<CardProductProps> = ({ product }) => {
  // console.log(' CardProduct:', product);
  return (
    <div className={styles.wrapper_cart}>
      <div className={styles.header}>
        {product.discount && <BageDiscount discount={product.discount} />}
        <div className={styles.rating}>
          <RatingStar rating={product.rating} size="small" />
        </div>
        <div className={styles.badge_favourites}>
          <BadgeFavourites productId={product.id} />
        </div>
        <Link href={`./${product.id}`}>
          <Image
            className={styles.img_product}
            src={product?.image[0]?.url}
            width={200}
            height={245}
            alt="Picture of the author"
            priority
          />
        </Link>
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
export default memo(CardProduct);
