import React, { FC } from 'react';
import styles from './top-categories.module.css';
import { TopCategoriesType } from '@/types/topCategories_type';
import { Divide } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type TopCategoriesPropsType = {
  topCategories: TopCategoriesType[] | undefined;
};
export const TopCategories: FC<TopCategoriesPropsType> = ({
  topCategories,
}) => {
  return (
    <section className={styles.section}>
      <div className="shared_container">
        {topCategories ? (
          <div className={styles.row}>
            {topCategories.map((category) => {
              return (
                <div key={category.id} className={styles.category_wrapper}>
                  <div className={styles.image}>
                    <Image
                      src={category.image.url}
                      width={390}
                      height={390}
                      alt="Picture of the author"
                      priority
                    />
                  </div>
                  <Link href={category.link} className={styles.title}>
                    {category.title}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <h3 className={styles.error}>No data received!</h3>
        )}
      </div>
    </section>
  );
};
