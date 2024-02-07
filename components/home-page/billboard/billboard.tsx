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
  billboards: BillboardType[];
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

  return (
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
        <div className=" relative mt-[-12%]">
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
  );
};

export default Billboard;
