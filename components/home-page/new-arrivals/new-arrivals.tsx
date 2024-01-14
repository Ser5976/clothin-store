'use client';
import { ProductType } from '@/types/product_type';
import Link from 'next/link';
import React, { FC, useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './new-arrivals.module.css';
import CardProduct from '@/components/card-product/card-product';
import { useSession } from 'next-auth/react';
import { NewArrialsSkeleton } from './slider-newArrivals-skeleton/newArrivals-skeleton';

type NewArrivalsProps = {
  products: ProductType[];
};

export const NewArrivals: FC<NewArrivalsProps> = ({ products }) => {
  //это для кастыля:чтобы сделать скелетон
  //при перезагрузки на всех размерах экрана сначало 6 карточек, а потом только срабатывает
  //адаптив,это из-та того что на сервер не знает о изменении размера экрана,
  //а клиент загружается позже
  const { status } = useSession();
  const isLoading = status === 'loading';

  //настройки слайдера
  const settings = {
    dots: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 6,
    infinite: true,
    //кастомный компонент - dots(делаем из точек горизонтальные чёрточки)
    customPaging: (i: number) => {
      return (
        <div>
          {products.map((el) => {
            return <div key={el.id} className="w-[30px] h-5"></div>;
          })}
        </div>
      );
    },
    // стили для кастомного компонента dots(находятся в globals.css)
    dotsClass: 'custom-indicator',
    //адаптив для слайдера
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };
  console.log('newArrivals render');
  // попытался оптимизировать,осталю для примера
  // useMemo в данном случае не работает, видимо из-за условного рендеренга
  const productsElement = useMemo(
    () =>
      products.map((product) => (
        <CardProduct product={product} key={product.id} />
      )),
    [products]
  );
  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>New arrivals</h2>

        <h3>
          Check out our latest arrivals for the upcoming season
          <Link href="#">See the collection here</Link>
        </h3>
        <div className={styles.slider}>
          {isLoading ? (
            <NewArrialsSkeleton />
          ) : (
            <Slider {...settings}>{productsElement}</Slider>
          )}
        </div>
      </div>
    </section>
  );
};
