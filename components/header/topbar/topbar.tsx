import Link from 'next/link';
import { Account } from './account/account';
import styles from './topbar.module.css';

export const TopBar = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.phone}>
            Available 24/7 at <span>(405) 555-0128</span>
          </div>
          <nav className={styles.links}>
            <Link href="/profile">Delivery & returns</Link>
            <Link href="/admin">Track order</Link>
            <Link href="/testi">Blog</Link>
            <Link href="/">Contacts</Link>
          </nav>
          <Account />
        </div>
      </div>
    </section>
  );
};
