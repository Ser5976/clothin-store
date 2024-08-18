'use client';
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
import { GetProductsType } from '@/types/get_products_type';
import { Divide } from 'lucide-react';

type NewArrivalsProps = {
  products: GetProductsType | null;
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
  // const ar = [] as [];

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>New arrivals</h2>
        <h3>
          Check out our latest arrivals for the upcoming season
          {!products ? (
            <div className=" text-red-500">
              The slider is not loaded, something went wrong!
            </div>
          ) : products.product.length === 0 ? (
            <div className=" text-red-500">
              The slider is empty, add products!
            </div>
          ) : (
            <Link href="./new-arrivals?limit=30">See the collection here</Link>
          )}
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
              {!products || products.product.length === 0
                ? Array.from({ length: 12 }).map((_, index) => {
                    return (
                      <CarouselItem
                        className="basis-1/6 max-lg:basis-1/5 max-sm:basis-1/4 pl-[0.2%] "
                        key={index}
                      >
                        <div className=" bg-slate-200 max-w-[240px] pb-[110%]"></div>
                      </CarouselItem>
                    );
                  })
                : products?.product.map((product) => (
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
