import { Skeleton } from '@/components/ui/skeleton';
import styles from './account.module.css';

export const AccountSkeleton = () => {
  return (
    <>
      <div className={styles.login}>
        <Skeleton className="w-[70px] h-[15px] bg-slate-200" />
      </div>
      <span> /</span>
      <div className={styles.register}>
        <Skeleton className="w-[70px] h-[15px] bg-slate-200" />
      </div>
    </>
  );
};
