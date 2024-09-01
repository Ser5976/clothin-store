'use client';
import CardProduct from '@/components/card-product/card-product';
import Link from 'next/link';
import { FC, useCallback, useState } from 'react';
import styles from './discount.module.css';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Arrows } from './arrows/arrows';
import { CustomButton } from '@/components/ui/custom-ui/custom-button/custom-button';
import { GetProductsType } from '@/types/get_products_type';

type DiscountTypesProps = {
  discount: GetProductsType | null;
};

export const Discount: FC<DiscountTypesProps> = ({ discount }) => {
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
        <p className={styles.title}>Sale up to 70%</p>
        {!discount ? (
          <div className=" text-red-500 text-lg ">Samething went wrong!</div>
        ) : discount.product.length === 0 ? (
          <div className=" text-red-500 text-lg">The list is empty!</div>
        ) : null}
        <Carousel
          setApi={setApi}
          className=" relative mt-[3%] mb-[7%]"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {!discount || discount.product.length === 0
              ? null
              : discount.product.map((product) => (
                  <CarouselItem className="basis-1/3 " key={product.id}>
                    <CardProduct product={product} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          {/* кастомный компонент стрелок */}
          {!discount || discount.product.length === 0 ? null : (
            <Arrows scrollNext={scrollNext} scrollPrev={scrollPrev} />
          )}
        </Carousel>
        {!discount || discount.product.length === 0 ? null : (
          <Link href="./discount?discount=true" className="self-center">
            <CustomButton>See all sale products</CustomButton>
          </Link>
        )}
      </div>
    </section>
  );
};
