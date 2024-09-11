import styles from './write-to-us.module.css';
import { CustomButton } from '@/components/ui/custom-ui/custom-button/custom-button';
import Image from 'next/image';
import Link from 'next/link';

export const WriteToUs = () => {
  return (
    <section className={styles.section}>
      <div className="shared_container">
        <div className={styles.wrapper}>
          <div className={styles.content_wrapper}>
            <p className={styles.title}>Write to Us</p>
            <Link href="/store-review">
              <CustomButton className="mt-[3%]">
                Go to the reviews page
              </CustomButton>
            </Link>
          </div>
          <div className={styles.imag}>
            <Image
              src="/home/letters.png"
              alt="image letters"
              width={461}
              height={416}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
