'use client';
import { CategoryType } from '@/types/category_type';
import styles from './navigation.module.css';
import Link from 'next/link';
import { FC, useState } from 'react';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

interface INavigationProps {
  categories: CategoryType[] | undefined;
}

export const Navigation: FC<INavigationProps> = ({ categories }) => {
  const searchParams = useSearchParams(); //для активации сылки
  const [selectCategory, setSelectCategory] = useState<CategoryType>(
    {} as CategoryType
  );
  const handelCategory = (category: CategoryType) => {
    setSelectCategory(category);
    setIsOpen(true);
  };
  //выпадающий список
  const [isOpen, setIsOpen] = useState(false);

  // console.log('isOpen:', isOpen);

  const handleClickOutside = (event: any) => {
    // console.log('работает handleClickOutside');
    if (
      event.target.id === 'overlay_top' ||
      event.target.id === 'overlay_bottom'
    ) {
      setIsOpen(false);
      setSelectCategory({} as CategoryType);
    }
  };
  //console.log('selectCategory:', selectCategory);
  return (
    <nav className={styles.categories}>
      {!categories ? (
        <h1 className="text-[16px] leading-[150%] font-bold  text-[#FF4242] text-center">
          No data received!
        </h1>
      ) : (
        categories.map((category) => {
          return (
            <div
              key={category.id}
              className={cn(styles.link, {
                [styles.link_active]:
                  searchParams.get('categoryId') === category.id ||
                  (selectCategory.id === category.id && isOpen),
              })}
              onClick={() => handelCategory(category)}
            >
              {category.name}
            </div>
          );
        })
      )}
      {/* выпадающий список */}
      <div
        onClick={handleClickOutside}
        id="overlay_top"
        className={cn({
          [styles.close]: !isOpen,
          [styles.dropdown_menu]: isOpen,
        })}
      >
        <div className=" bg-white border-b transition duration-700 ease-in-out ">
          <div className="shared_container py-5 custom-scroll-navigation-dropdown ">
            <div className="grid grid-cols-4 gap-4 mx-auto w-full   ">
              {selectCategory.types?.map((type) => {
                return (
                  <div key={type.id}>
                    <Link
                      href={`/categories?categoryId=${selectCategory.id}&typeId=${type.id}`}
                      className={cn('text-gray-400', {
                        [styles.link_active]:
                          searchParams.get('typeId') === type.id,
                      })}
                      onClick={() => setIsOpen(false)}
                    >
                      {type.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          id="overlay_bottom"
          className=" w-full bg-black/60 h-screen"
          onClick={handleClickOutside}
        ></div>
      </div>
    </nav>
  );
};
