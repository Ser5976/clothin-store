'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './profile.module.css';

export const ProfileNavigation = () => {
  const pathname = usePathname();
  return (
    <div className={styles.menu_container}>
      <div
        className={cn(styles.menu_link, {
          [styles.menu_link_active]: '/profile' === pathname,
        })}
      >
        <Link
          href="/profile"
          className={cn(styles.menu_link_text, {
            [styles.menu_link_text_active]: '/profile' === pathname,
          })}
        >
          Personal data
        </Link>
      </div>
      <div
        className={cn(styles.menu_link, {
          [styles.menu_link_active]: '/profile/review-profile' === pathname,
        })}
      >
        <Link
          href="/profile/review-profile"
          className={cn(styles.menu_link_text, {
            [styles.menu_link_text_active]:
              '/profile/review-profile' === pathname,
          })}
        >
          Your review
        </Link>
      </div>
      <div
        className={cn(styles.menu_link, {
          [styles.menu_link_active]: '/profile/order-profile' === pathname,
        })}
      >
        <div className={styles.menu_link_review}>
          <Link
            href="/profile/order-profile"
            className={cn(styles.menu_link_text, {
              [styles.menu_link_text_active]:
                '/profile/order-profile' === pathname,
            })}
          >
            Your oreder
          </Link>
        </div>
      </div>
    </div>
  );
};
