'use client';
import CardProduct from '@/components/card-product/card-product';
import { useCallback, useState } from 'react';
import styles from './now-trending.module.css';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Arrows } from './arrows/arrows';
import { useTrendingProductQuery } from '@/react-queries/useTrendingProductQuery';
import { Loader } from 'lucide-react';

// данные  товаров,которые чаще всего покупают, буду получать на клиенте,т.к. на продакшене(Vercel)
// несмотря ни на что(export const dynamic = 'force-dynamic',{ cache: 'no-store' }) Next.js принудительно кэширует
// и данные не обновляются
export const NowTrending = () => {
  // кастомный хук useQuery,делаем запрос на получение всех товаров
  const { data: nowTrending, isError, isLoading } = useTrendingProductQuery();
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

        {isError ? (
          <div className=" text-red-500">Samething went wrong!</div>
        ) : isLoading ? (
          <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
            <Loader size={32} color="#17696a" />
          </div>
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
