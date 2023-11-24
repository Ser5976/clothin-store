'use client';
import { cn } from '@/lib/utils';
import styles from './burger-menu.module.css';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { SearchInput } from '../../search-input/searchinput';
import { usePathname } from 'next/navigation';
import { CustomersType } from '@/types/customers_type';
import { CategoryType } from '@/types/category_type';

interface BurgerMenuProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  categories: CategoryType[] | undefined;
  customers: CustomersType[] | undefined;
}

const BurgerMenu: FC<BurgerMenuProps> = ({
  show,
  setShow,
  categories,
  customers,
}) => {
  const pathname = usePathname();

  return (
    <div
      className={cn({
        [styles.wrapper]: show,
        [styles.close]: !show,
      })}
    >
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src="/header/logo.png" alt="logo" width={130} height={22} />
        </div>
        <div className={styles.cross} onClick={() => setShow(false)}>
          <div className={styles.cross_1} />
          <div className={styles.cross_2} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.search}>
          <SearchInput mark="burger-menu" setShow={setShow} />
        </div>

        <nav className={styles.categories}>
          {!categories ? (
            <h1 className="text-[14px] leading-[150%] font-bold text-[#FF4242] ">
              No data received!
            </h1>
          ) : (
            categories.map((category) => {
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className={cn(styles.link_categories, {
                    [styles.link_active]:
                      `${pathname.split('/')[2]}` === category.id,
                  })}
                  onClick={() => setShow(false)}
                >
                  {category.name}
                </Link>
              );
            })
          )}
        </nav>
        <nav className={styles.for_customers}>
          {!customers ? (
            <h1 className="text-[14px] leading-[150%] font-bold text-[#FF4242] mt-5 text-center">
              No data received!
            </h1>
          ) : (
            customers.map((article) => {
              return (
                <Link
                  key={article.id}
                  href={`/for-customers/${article.id}`}
                  className={cn(styles.link_customers, {
                    [styles.link_active]:
                      `${pathname.split('/')[2]}` === article.id,
                  })}
                  onClick={() => setShow(false)}
                >
                  {article.name}
                </Link>
              );
            })
          )}
        </nav>
      </div>
    </div>
  );
};

export default BurgerMenu;
