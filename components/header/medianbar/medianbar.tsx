import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input/searchinput';
import styles from './medianbar.module.css';
import { ToolBar } from './toolbar/toolbar';

export const MedianBar = () => {
  return (
    <section className={styles.header}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.logo}>
            <Link href="/">
              <Image
                src="/header/logo.png"
                alt="logo"
                width={130}
                height={22}
              />
            </Link>
          </div>
          <nav className={styles.links}>
            <Link href="#">Women</Link>
            <Link href="#">Men</Link>
            <Link href="#">Girls</Link>
            <Link href="#">Boys</Link>
            <Link href="#">Sale</Link>
          </nav>
          <SearchInput />
          <ToolBar />
        </div>
      </div>
    </section>
  );
};
