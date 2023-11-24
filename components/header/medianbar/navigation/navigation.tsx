'use client';
import { CategoryType } from '@/types/category_type';
import styles from './navigation.module.css';
import Link from 'next/link';
import { FC } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface INavigationProps {
  categories: CategoryType[] | undefined;
}

export const Navigation: FC<INavigationProps> = ({ categories }) => {
  const pathname = usePathname();

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
              href={`/categories/${category.id}`}
              className={cn(styles.link, {
                [styles.link_active]:
                  `${pathname.split('/')[2]}` === category.id,
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
