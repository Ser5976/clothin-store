import { CustomButton } from '@/components/ui/custom-ui/custom-button/custom-button';
import { BillboardType } from '@/types/carousel_type';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './slide.module.css';

type SlidePropsType = {
  slide: BillboardType;
};

export const Slide: FC<SlidePropsType> = ({ slide }) => {
  //console.log('slide render:', slide);
  return (
    <section className={styles.section}>
      <div className="shared_container">
        <div className={styles.content}>
          <div className={styles.title}>{slide.title}</div>
          <div className={styles.subtitle}>{slide.subTitle}</div>
          <Link href={`/categories?categoryId=${slide.link}`}>
            <CustomButton>Shop the collection</CustomButton>
          </Link>
        </div>
      </div>
      <div className={styles.img_wrapper}>
        <Image
          src={slide.image.url}
          width={1500}
          height={700}
          alt="Picture of the author"
          priority
        />
      </div>
    </section>
  );
};
