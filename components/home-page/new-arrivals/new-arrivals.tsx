'use client';
import { ProductType } from '@/types/product_type';
import Link from 'next/link';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './new-arrivals.module.css';
import CardProduct from '@/components/card-product/card-product';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type NewArrivalsProps = {
  products: ProductType[];
};

export const NewArrivals: FC<NewArrivalsProps> = ({ products }) => {
  // для точек
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>New arrivals</h2>
        <h3>
          Check out our latest arrivals for the upcoming season
          <Link href="./new-arrivals?limit=30">See the collection here</Link>
        </h3>
        <div className={styles.slider}>
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
              slidesToScroll: 3,
            }}
          >
            <CarouselContent className="-ml-[0.1%]">
              {products.map((product) => (
                <CarouselItem
                  className="basis-1/6 max-lg:basis-1/5 max-sm:basis-1/4 pl-[0.1%] "
                  key={product.id}
                >
                  <CardProduct product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* кастомные точки */}
          <div className={styles.dots}>
            {api?.scrollSnapList().map((_, index) => (
              <div
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(styles.dot, {
                  [styles.dot_active]: index === selectedIndex,
                })}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
