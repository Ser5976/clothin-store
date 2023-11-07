'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import styles from './searchinput.module.css';

export const SearchInput = () => {
  const route = useRouter();
  const [search, setSearch] = useState('');
  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const submit = () => {
    route.push(`/search?value=${search}`);
    setSearch('');
  };
  // тоже но только после нажатия на кнопку энтер
  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search !== '') {
      route.push(`/search?value=${search}`);
      setSearch('');
    }
  };
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search for products..."
        className={styles.input}
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
