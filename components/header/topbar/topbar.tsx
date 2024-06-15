'use client';
import { cn } from '@/lib/utils';
import { CategoryType } from '@/types/category_type';
import { CustomersType } from '@/types/customers_type';
import { RequisitesType } from '@/types/requisites_type';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { Account } from './account/account';
import Burger from './burger/burger';
import styles from './topbar.module.css';

interface ITopBarProps {
  categories: CategoryType[] | undefined;
  customers: CustomersType[] | undefined;
  requisites: RequisitesType[] | undefined;
}

export const TopBar: FC<ITopBarProps> = ({
  categories,
  customers,
  requisites,
}) => {
  const pathname = usePathname();

  return (
    <section className={styles.section}>
      <div className="shared_container">
        <div className={styles.row}>
          <Burger categories={categories} customers={customers} />
          {!requisites ? (
            <h1 className="text-[14px] leading-[150%] font-bold text-[#FF4242] max-[820px]:hidden">
              No data received!
            </h1>
          ) : (
            requisites.map((item) => {
              return (
                <div className={styles.phone} key={item.id}>
                  <div>{item.title}</div>
                  <span>{item.phone}</span>
                </div>
              );
            })
          )}
          <nav className={styles.for_customers}>
            {!customers ? (
              <h1 className="text-[14px] leading-[150%] font-bold text-[#FF4242]">
                No data received!
              </h1>
            ) : (
              customers.map((article) => {
                return (
                  <Link
                    key={article.id}
                    href={`/for-customers/${article.id}`}
                    className={cn(styles.link, {
                      [styles.link_active]:
                        `${pathname.split('/')[2]}` === article.id,
                    })}
                  >
                    {article.name}
                  </Link>
                );
              })
            )}
          </nav>
          <Account />
        </div>
      </div>
    </section>
  );
};
