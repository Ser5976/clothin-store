'use client';
import { Input } from '@/components/ui/input';
import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useSearchQuery } from '@/react-queries/useSearchQuery';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './searchinput.module.css';

//SearchInput используем в двух компонентах, из-за отличий в css делаем условия
interface SearchInputProps {
  mark: 'medianbar' | 'burger-menu';
  burgerImput: boolean;
}

export const SearchInput: FC<SearchInputProps> = ({ mark, burgerImput }) => {
  const [query, setQuery] = useState('');
  //закрываем область поиска а в бургере закрываем бурге меню
  const handlerLink = () => {
    setQuery('');
  };
  //закрываем область поиска
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  //делаем запрос в базу данных type,brand,material,ищем  по name
  // кастомный хук useQuery
  const { data, refetch } = useSearchQuery(query);
  //т.к. при  вводе данных в поисковую строку результаты будут загружаться в реальном времени,делать задержку
  // чтобы было меньше запросов
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      if (query.length > 0) {
        refetch();
      }
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [query, refetch]);

  //console.log('query:', data);

  return (
    <div
      className={cn({
        [styles.medianbar]: mark === 'medianbar',
        [styles.burger_menu]: mark === 'burger-menu',
      })}
    >
      <Input
        type="text"
        placeholder="Search for products..."
        className={cn({
          [styles.input]: mark === 'medianbar',
          [styles.input_burger]: mark === 'burger-menu',
        })}
        value={query}
        onChange={handlerInput}
      />

      <Image
        src="/header/search.svg"
        alt="search"
        width={16}
        height={16}
        className={styles.image}
      />
      {data && query.length > 0 && (
        <div className={styles.container_search}>
          <ul className="flex flex-col ">
            {data.length === 0 ? (
              <div className="text-sm text-gray-600 py-1 px-4 rounded-sm">
                We didn't find anything
              </div>
            ) : (
              data?.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    {burgerImput ? (
                      <SheetClose asChild>
                        <Link
                          href={`/search?${item.search}=${item.id}`}
                          className={styles.item_search}
                          onClick={handlerLink}
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ) : (
                      <Link
                        href={`/search?${item.search}=${item.id}`}
                        className={styles.item_search}
                        onClick={handlerLink}
                      >
                        {item.name}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
