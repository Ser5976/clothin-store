'use client';
import CardProduct from '@/components/card-product/card-product';
import { ProductType } from '@/types/product_type';
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

type DiscountTypesProps = {
  discount: ProductType[];
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

        <Carousel
          setApi={setApi}
          className=" relative mt-[3%] mb-[7%]"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {discount.map((product) => (
              <CarouselItem className="basis-1/3 " key={product.id}>
                <CardProduct product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* кастомный компонент стрелок */}
          <Arrows scrollNext={scrollNext} scrollPrev={scrollPrev} />
        </Carousel>
        <Link href="#" className="self-center">
          <CustomButton>See all sale products</CustomButton>
        </Link>
      </div>
    </section>
  );
};
