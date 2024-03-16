'use client';
import CardProduct from '@/components/card-product/card-product';
import { ProductType } from '@/types/product_type';
import Link from 'next/link';
import { FC, useCallback, useState } from 'react';
import styles from './now-trending.module.css';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Arrows } from './arrows/arrows';
import { CustomButton } from '@/components/ui/custom-ui/custom-button/custom-button';

type NowTrendingTypesProps = {
  nowTrending: ProductType[];
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
        <Link href="./trending-now" className="self-center">
          <CustomButton>Explore top sales</CustomButton>
        </Link>
      </div>
    </section>
  );
};
