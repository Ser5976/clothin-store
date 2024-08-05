'use client';
import { CategoryType } from '@/types/category_type';
import styles from './navigation.module.css';
import Link from 'next/link';
import { FC } from 'react';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

interface INavigationProps {
  categories: CategoryType[] | undefined;
}

export const Navigation: FC<INavigationProps> = ({ categories }) => {
  const searchParams = useSearchParams();

  return (
    <nav className={styles.categories}>
      {!categories ? (
        <h1 className="text-[16px] leading-[150%] font-bold  text-[#FF4242] text-center">
          No data received!
        </h1>
      ) : (
        categories.map((category) => {
          return (
            <Link
              key={category.id}
              href={`/categories?categoryId=${category.id}`}
              className={cn(styles.link, {
                [styles.link_active]:
                  searchParams.get('categoryId') === category.id,
              })}
            >
              {category.name}
            </Link>
          );
        })
      )}
    </nav>
  );
};
