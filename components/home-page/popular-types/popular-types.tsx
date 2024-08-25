import { cn } from '@/lib/utils';
import { PopularTypesType } from '@/types/popular_types_type';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import styles from './popular-types.module.css';

type PopularTypesProps = {
  popularTypes: PopularTypesType[] | null;
};

export const PopularTypes: FC<PopularTypesProps> = ({ popularTypes }) => {
  const ar = [] as [];
  return (
    <section className={styles.section}>
      <p className={styles.title}>Popular categories</p>
      {!popularTypes ? (
        <div className=" text-red-500 text-center pb-2 md:text:lg lg:text-xl">
          The popular categories is not loaded, something went wrong!
        </div>
      ) : ar.length === 0 ? (
        <div className=" text-red-500 text-center pb-2 md:text:lg lg:text-xl">
          The popular categories is empty, add products!
        </div>
      ) : null}
      <div className={styles.row}>
        {!popularTypes || ar.length === 0
          ? Array.from({ length: 6 }).map((_, index) => {
              return (
                <div
                  key={index}
                  className={cn(styles.image, 'bg-slate-200')}
                ></div>
              );
            })
          : popularTypes.map((type) => {
              return (
                <Link
                  href={`/popular-type?typeId=${type.link}`}
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
