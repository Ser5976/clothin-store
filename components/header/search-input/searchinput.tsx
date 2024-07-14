'use client';
import { Input } from '@/components/ui/input';
import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useSearchQuery } from '@/react-queries/useSearchQuery';
import { useSearchNameStore } from '@/stores/useSearchNameStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styles from './searchinput.module.css';

//SearchInput используем в двух компонентах, из-за отличий в css делаем условия
interface SearchInputProps {
  mark: 'medianbar' | 'burger-menu';
  isBurger: boolean;
}

export const SearchInput: FC<SearchInputProps> = ({ mark, isBurger }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  //стор для поискового имени
  const setSearchName = useSearchNameStore((state) => state.setSearchName);
  //закрываем область поиска а в бургере закрываем бурге меню, а так же передаём  в стор поискового слова для страницы shearh
  const handlerLink = (name: string, search: string, id: string) => {
    setSearchName(name);
    setQuery('');
    router.push(`/search?${search}=${id}`);
  };
  //закрываем область поиска
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  //делаем запрос в базу данных type,brand,material,ищем  по name
  // кастомный хук useQuery
  const { data, refetch } = useSearchQuery(query);
  //т.к. при  вводе данных в поисковую строку результаты будут загружаться в реальном времени,делаем задержку
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
  /* const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Убираем фокус с input после монтирования компонента
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);
 */
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
                    {isBurger ? (
                      <SheetClose asChild>
                        <div
                          className={styles.item_search}
                          onClick={() =>
                            handlerLink(item.name, item.search, item.id)
                          }
                        >
                          {item.name}
                        </div>
                      </SheetClose>
                    ) : (
                      <div
                        className={styles.item_search}
                        onClick={() =>
                          handlerLink(item.name, item.search, item.id)
                        }
                      >
                        {item.name}
                      </div>
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
