import React, { FC } from 'react';
import styles from './top-categories.module.css';
import { TopCategoriesType } from '@/types/topCategories_type';
import Image from 'next/image';
import Link from 'next/link';

type TopCategoriesPropsType = {
  topCategories: TopCategoriesType[];
};
export default function TopCategories({
  topCategories,
}: {
  topCategories: TopCategoriesType[];
}) {
  // console.log('render top:');
  return (
    <section className={styles.section}>
      <div className="shared_container">
        <div className={styles.row}>
          {topCategories.map((category) => {
            return (
              <Link
                href={`/categories/${category.link}`}
                key={category.id}
                className={styles.category_wrapper}
              >
                <div className={styles.image}>
                  <Image
                    src={category.image.url}
                    width={390}
                    height={390}
                    alt="Picture of the author"
                    priority
                  />
                </div>
                <div className={styles.title}>{category.title}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
