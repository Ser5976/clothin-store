'use client';
import CardProduct from '@/components/card-product/card-product';
import { ProductType } from '@/types/product_type';
import { FC, useCallback, useState } from 'react';
import styles from './now-trending.module.css';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Arrows } from './arrows/arrows';

type NowTrendingTypesProps = {
  nowTrending: ProductType[] | null;
};

export const NowTrending: FC<NowTrendingTypesProps> = ({ nowTrending }) => {
  //эта логика для кастомных стрелок,т.к. свои трудно было отстилизовать
  const [api, setApi] = useState<CarouselApi>();
  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.title}>Trending now</p>

        {!nowTrending ? (
          <div className=" text-red-500">Samething went wrong!</div>
        ) : nowTrending.length === 0 ? (
          <div className=" text-red-500">
            Unfortunately, not a single product has been purchased!
          </div>
        ) : (
          <Carousel
            setApi={setApi}
            className=" relative mt-[3%] mb-[7%]"
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {nowTrending.map((product) => (
                <CarouselItem className="basis-1/3 " key={product.id}>
                  <CardProduct product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* кастомный компонент стрелок */}
            <Arrows scrollNext={scrollNext} scrollPrev={scrollPrev} />
          </Carousel>
        )}
      </div>
    </section>
  );
};
