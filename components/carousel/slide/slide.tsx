import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BillboardType } from '@/types/carousel_type';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './slide.module.css';

type SlidePropsType = {
  slide: BillboardType;
};

export const Slide: FC<SlidePropsType> = ({ slide }) => {
  return (
    <section className={styles.section}>
      <div className="shared_container">
        <div className={styles.content}>
          <div className={styles.title}>{slide.title}</div>
          <div className={styles.subtitle}>{slide.subTitle}</div>

          <Link
            href={`./categories/${slide.link}`}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              styles.link_button
            )}
          >
            Shop the {slide.subTitle?.slice(0, -5)}
          </Link>
        </div>
      </div>
      <div className={styles.img_wrapper}>
        <Image
          src={slide.image.url}
          fill
          objectFit="cover"
          objectPosition="top"
          alt="Picture of the author"
        />
      </div>
    </section>
  );
};
