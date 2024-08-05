import { FC } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import styles from './burger.module.css';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { SearchInput } from '../../search-input/searchinput';
import { CategoryType } from '@/types/category_type';
import { CustomersType } from '@/types/customers_type';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface BurgerProps {
  categories: CategoryType[] | undefined;
  customers: CustomersType[] | undefined;
}

const Burger: FC<BurgerProps> = ({ categories, customers }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className={styles.burger}>
          <div className={styles.rectangel}></div>
          <div className={styles.rectangel}></div>
          <div className={styles.rectangel}></div>
        </div>
      </SheetTrigger>
      <SheetContent className=" bg-slate-100">
        <SheetHeader>
          <SheetTitle className={styles.header}>
            <div className={styles.logo}>
              <Image
                src="/header/logo.png"
                alt="logo"
                width={130}
                height={22}
              />
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className={styles.content}>
          <div className={styles.search}>
            <SearchInput mark="burger-menu" isBurger={true} />
          </div>

          <nav className={styles.categories}>
            {!categories ? (
              <h1 className="text-[14px] leading-[150%] font-bold text-[#FF4242] ">
                No data received!
              </h1>
            ) : (
              categories.map((category) => {
                return (
                  <SheetClose key={category.id} asChild>
                    <Link
                      href={`/categories?categoryId=${category.id}`}
                      className={cn(styles.link, {
                        [styles.link_active]:
                          searchParams.get('categoryId') === category.id,
                      })}
                    >
                      {category.name}
                    </Link>
                  </SheetClose>
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
                  >
                    {article.name}
                  </Link>
                );
              })
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Burger;
