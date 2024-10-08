'use client';
import { cn } from '@/lib/utils';
import { useReviewsProductQuery } from '@/react-queries/useReviewsProductQuery';
import { useProductMenuStore } from '@/stores/useProductMenuStore';
import { RotateCw } from 'lucide-react';
import { FC } from 'react';
import styles from './product-menu.module.css';

type ProductMenu = {
  productId: string;
};

export const ProductMenu: FC<ProductMenu> = ({ productId }) => {
  //получение данных menuActive,setMenuActive из стора,для навигации
  const { menuActive, setMenuActive } = useProductMenuStore((state) => state);

  //получаем данные по отзывам отдельным запросом ,при помощи кастомного хука, для useQuery, useReviewsProductQuery
  // это нужно для интерактива на клиенте, для получения количества отзывов
  const { data, isError, isLoading } = useReviewsProductQuery(productId, {
    oldest: false,
    rating: false,
    reset: false,
    page: 1,
  });

  // console.log('data:', data);
  return (
    <div className={styles.menu_container}>
      <div
        className={cn(styles.menu_link, {
          [styles.menu_link_active]: 'general-info' === menuActive,
        })}
        onClick={() => setMenuActive('general-info')}
      >
        <div
          className={cn(styles.menu_link_text, {
            [styles.menu_link_text_active]: 'general-info' === menuActive,
          })}
        >
          General info
        </div>
      </div>
      <div
        className={cn(styles.menu_link, {
          [styles.menu_link_active]: 'product-details' === menuActive,
        })}
        onClick={() => setMenuActive('product-details')}
      >
        <div
          className={cn(styles.menu_link_text, {
            [styles.menu_link_text_active]: 'product-details' === menuActive,
          })}
        >
          Product details
        </div>
      </div>
      <div
        className={cn(styles.menu_link, {
          [styles.menu_link_active]: 'reviews' === menuActive,
        })}
        onClick={() => setMenuActive('reviews')}
      >
        <div className={styles.menu_link_review}>
          <div
            className={cn(styles.menu_link_text, {
              [styles.menu_link_text_active]: 'reviews' === menuActive,
            })}
          >
            Reviews{' '}
          </div>
          <div
            className={cn(styles.menu_link_review_count, {
              [styles.menu_link_text_active]: 'reviews' === menuActive,
            })}
          >
            {isError ? (
              <div className={styles.menu_link_review_count_error}>?</div>
            ) : isLoading ? (
              <RotateCw
                size={12}
                color="#808080"
                strokeWidth={1.5}
                absoluteStrokeWidth
                className="  animate-spin"
              />
            ) : data.count > 0 ? (
              data.count
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
