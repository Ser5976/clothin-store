'use client';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ProductType } from '@/types/product_type';
import Image from 'next/image';
import { FC, useCallback, useEffect, useState } from 'react';
import { Arrows } from './arrows';
import styles from './product-gallery.module.css';

type ProductGalleryProps = {
  product: ProductType;
};

export const ProductGallery: FC<ProductGalleryProps> = ({ product }) => {
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
    <div className={styles.container}>
      <div className={styles.images}>
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
            duration: 50,
          }}
        >
          <CarouselContent>
            {product.image.map((slide) => (
              <CarouselItem key={slide.id}>
                <Image
                  src={slide.url}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                  alt="Picture of the author"
                  quality={100}
                  priority
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      {/* кастомные точки */}
      <div className={styles.dots}>
        {product.image.map((slide, index) => (
          <div
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(' cursor-pointer', {
              [styles.dot_active]: index === selectedIndex,
            })}
          >
            <Image
              className="h-full w-full object-cover"
              src={slide.url}
              width={200}
              height={200}
              alt="Picture of the author"
              quality={100}
              priority
            />
          </div>
        ))}
      </div>
      {/* кастомные стрелки */}
      <Arrows prevArrow={scrollPrev} nextArrow={scrollNext} />
    </div>
  );
};
