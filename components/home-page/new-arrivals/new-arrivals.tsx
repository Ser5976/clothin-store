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
  const ar = [] as [];
  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>New arrivals</h2>
        <h3>
          Check out our latest arrivals for the upcoming season
          <Link href="./new-arrivals?limit=30">See the collection here</Link>
        </h3>
        {products ? (
          ar.length === 0 ? (
            <div
              className=" flex bg-slate-200 h-[100px] justify-center items-center  m-2
             sm:h-[150px] lg:h-[200px] md:text-xl  lg:text-2xl
            "
            >
              The products is not received
            </div>
          ) : (
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
                  {products?.product.map((product) => (
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
          )
        ) : (
          <div className=" flex bg-slate-200 h-[200px] justify-center items-center text-lg text-red-500 m-2">
            The slider is not loaded, something went wrong!
          </div>
        )}
      </div>
    </section>
  );
};
