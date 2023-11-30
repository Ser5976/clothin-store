import Image from 'next/image';
import Link from 'next/link';
import styles from './bottombar.module.css';

export const BottomBar = () => {
  return (
    <section className={styles.section}>
      <div className="shared_container">
        <div className={styles.row}>
          <div className={styles.baner_text}>
            <Image
              src="/header/left-chevron.svg"
              alt="chevron"
              width={16}
              height={16}
            />
            <div className={styles.inner_text}>
              <div className={styles.left_text}>Up to 70% Off. </div>
              <Link href={'/sale/latest'} className={styles.right_text}>
                Shop our latest sale styles
              </Link>
            </div>
            <Image
              src="/header/right-chevron.svg"
              alt="chevron"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
