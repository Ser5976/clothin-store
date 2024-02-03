import { PopularTypesType } from '@/types/popular_types_type';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import styles from './popular-types.module.css';

type PopularTypesProps = {
  popularTypes: PopularTypesType[];
};

export const PopularTypes: FC<PopularTypesProps> = ({ popularTypes }) => {
  return (
    <section className={styles.section}>
      <p className={styles.title}>Popular categories</p>
      <div className={styles.row}>
        {popularTypes.map((type) => {
          return (
            <Link
              href={`/types/${type.link}`}
              key={type.id}
              className={styles.category_wrapper}
            >
              <div className={styles.image}>
                <Image
                  src={type.image.url}
                  width={180}
                  height={180}
                  alt="Picture of the author"
                  priority
                />
              </div>
              <div className={styles.name}>{type.title}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
