'use client';
import { FC, useCallback, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import styles from './billboard.module.css';
import { BillboardType } from '@/types/carousel_type';
import { Slide } from './slide/slide';
import { SliderControls } from './slider-controls/slider-controls';
import { Arrows } from './arrows/arrows';

type BillboardPropsType = {
  billboards: BillboardType[] | null;
};

const Billboard: FC<BillboardPropsType> = ({ billboards }) => {
  const [api, setApi] = useState<CarouselApi>();
  //  логика для кастомных точек
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

  // логика для кастомных стрелок
  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const ar = [] as [];
  return (
    <>
      {billboards ? (
        billboards.length === 0 ? (
          <div
            className=" flex bg-slate-200 w-full h-[150px] sm:h-[250px] md:h-[350px]  justify-center 
          items-center  md:text-xl lg:h-[550px] lg:text-2xl"
          >
            The slider is empty
          </div>
        ) : (
          <div className=" relative">
            <Carousel
              setApi={setApi}
              opts={{
                align: 'start',
                loop: true,
                duration: 50,
              }}
            >
              <CarouselContent>
                {billboards.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <Slide slide={slide} key={slide.id} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/*  кастомный компонент - номер слайда */}
            <div className="shared_container">
              <div className=" absolute top-[70%] w-full">
                <div className={styles.row}>
                  {api?.scrollSnapList().map((_, index) => {
                    return (
                      <SliderControls
                        index={index}
                        selectedIndex={selectedIndex}
                        scrollTo={scrollTo}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            {/*  кастомный компонент - стрелки */}
            <Arrows prevArrow={scrollPrev} nextArrow={scrollNext} />
          </div>
        )
      ) : (
        <div
          className=" flex bg-slate-200 w-full h-[150px] sm:h-[250px] md:h-[350px]  justify-center 
        items-center md:text-xl lg:h-[550px] lg:text-2xl text-red-500"
        >
          The slider is not loaded, something went wrong!
        </div>
      )}
    </>
  );
};

export default Billboard;
