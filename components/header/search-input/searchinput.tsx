'use client';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './searchinput.module.css';

//SearchInput используем в двух компонентах, из-за отличий в css делаем условия
interface SearchInputProps {
  mark: 'medianbar' | 'burger-menu';
  setShow?: Dispatch<SetStateAction<boolean>>; //для закрытия burger-menu
}

export const SearchInput: FC<SearchInputProps> = ({ mark, setShow }) => {
  const route = useRouter();
  const [search, setSearch] = useState('');
  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const submit = () => {
    route.push(`/search?value=${search}`);
    setSearch('');
    setShow && setShow(false);
  };
  // тоже но только после нажатия на кнопку энтер
  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search !== '') {
      route.push(`/search?value=${search}`);
      setSearch('');
      setShow && setShow(false);
    }
  };
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
        value={search}
        onChange={handler}
        onKeyPress={pressEnter}
      />

      <Image
        src="/header/search.svg"
        alt="search"
        width={16}
        height={16}
        className={styles.image}
        onClick={submit}
      />
    </div>
  );
};
