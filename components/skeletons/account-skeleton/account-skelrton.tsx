import styles from './account-skeleton.module.css';
import { Skeleton } from '@/components/ui/skeleton';

export const AccountSkelrton = () => {
  return (
    <div className={styles.account}>
      <div className={styles.login}>
        <Skeleton className="h-2 w-2 rounded-full bg-white opacity-[0.1] " />
        <Skeleton className="h-2 w-[50px] bg-white opacity-[0.7]" />
      </div>
      <span> /</span>

      <Skeleton className="h-4 w-[50px] bg-white opacity-[0.7]" />
    </div>
  );
};
