import { CategoryType } from '@/types/category_type';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { SearchInput } from '../search-input/searchinput';
import styles from './medianbar.module.css';
import { Navigation } from './navigation/navigation';
import { ToolBar } from './toolbar/toolbar';

interface IMedianbarProps {
  categories: CategoryType[] | undefined;
}
export const MedianBar: FC<IMedianbarProps> = ({ categories }) => {
  return (
    <section className={styles.section}>
      <div className="shared_container">
        <div className={styles.row}>
          <Link href="/">
            <Image src="/header/logo.png" alt="logo" width={130} height={22} />
          </Link>
          <Navigation categories={categories} />
          <SearchInput mark="medianbar" />
          <ToolBar />
        </div>
      </div>
    </section>
  );
};
