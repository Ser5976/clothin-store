'use client';
import { cn } from '@/lib/utils';
import { CategoryType } from '@/types/category_type';
import { CustomersType } from '@/types/customers_type';
import { Phone } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import { Account } from './account/account';
import Burger from './burger/burger';
import BurgerMenu from './burger_menu/burger-menu';
import styles from './topbar.module.css';

interface ITopBarProps {
  categories: CategoryType[] | undefined;
  customers: CustomersType[] | undefined;
  phone: Phone[] | undefined;
}

export const TopBar: FC<ITopBarProps> = ({ categories, customers, phone }) => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  return (
    <section className={styles.section}>
      <div className="shared_container">
        <div className={styles.row}>
          <Burger show={show} setShow={setShow} />
          {!phone ? (
            <h1 className="text-[14px] leading-[150%] font-bold text-[#FF4242] max-[820px]:hidden">
              No data received!
            </h1>
          ) : (
            phone.map((item) => {
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
      <BurgerMenu
        show={show}
        setShow={setShow}
        categories={categories}
        customers={customers}
      />
    </section>
  );
};
