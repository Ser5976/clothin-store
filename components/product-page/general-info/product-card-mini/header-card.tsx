'use client';
import { BadgeFavourites } from '@/components/bage-favourites.tsx/badge-favourites';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ProductType } from '@/types/product_type';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, useCallback, useEffect, useState } from 'react';
import styles from './product-card-mini.module.css';

// это чтобы конфликта с сервером не было(динамический роут)
const RatingStar = dynamic(
  () => import('@/components/ui/custom-ui/rating-star/rating-star'),
  {
    ssr: false,
  }
);

type HeaderCardProps = {
  product: ProductType;
};

export const HeaderCard: FC<HeaderCardProps> = ({ product }) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  // логика для кастомных стрелок
  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);
  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
        loop: true,
        duration: 50,
      }}
    >
      <CarouselContent>
        {product.image.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className={styles.header}>
              {product.discount && (
                <div className={styles.discount}>-{product.discount}%</div>
              )}
              <div className={styles.rating}>
                <RatingStar rating={product.rating} size="middle" />
              </div>
              <div className={styles.badge_favourites}>
                <BadgeFavourites productId={product.id} />
              </div>

              <Image
                className={styles.img_product}
                src={slide.url}
                width={390}
                height={420}
                alt="Picture of the author"
                quality={100}
                priority
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
