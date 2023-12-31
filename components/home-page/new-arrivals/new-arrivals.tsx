'use client';
import { CardProduct } from '@/components/card-product/card-product';
import { ProductType } from '@/types/product_type';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './new-arrivals.module.css';
import { useSession } from 'next-auth/react';
import { useFavouritesStore } from '@/stores/useFavouritesStore';
import { useFavouritesPost } from '@/react-queries/useFavouritesPost';

type NewArrivalsProps = {
  products: ProductType[];
};

export const NewArrivals: FC<NewArrivalsProps> = ({ products }) => {
  //проверка авторизации
  const session = useSession();
  //получение данных favourites из стора
  const state = useFavouritesStore((state) => state);
  //кастомный хук useMutation, изменяем данные favourites в базе
  const mutationFavourites = useFavouritesPost();

  useEffect(() => {
    // проверка если пользователь авторизован и в сторе есть данные, тогда записываем их в базу
    // и очищаем стор
    if (session.data && state.favourites.length > 0) {
      mutationFavourites.mutate({ productIdArray: state.favourites });
      state.clearingFavorites();
    }
  }, [session]);
  console.log('render newArrivals:');
  const settings = {
    dots: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 6,
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
        breakpoint: 820,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>New arrivals</h2>
        <h3>
          Check out our latest arrivals for the upcoming season
          <Link href="#">See the collection here</Link>
        </h3>
        <div className={styles.slider}>
          <Slider {...settings}>
            {products.map((item) => {
              return <CardProduct product={item} key={item.id} />;
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};
