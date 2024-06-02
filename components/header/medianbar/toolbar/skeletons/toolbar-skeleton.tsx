import { Skeleton } from '@/components/ui/skeleton';
import styles from './toolbar-skeleton.module.css';

export const ToolbarSkeleton = () => {
  return (
    <div className={styles.toolbar}>
      <Skeleton className="w-[40px] h-[12px]" />

      <div className={styles.divider}></div>
      <div className={styles.cart}>
        <Skeleton className="w-[40px] h-[12px]" />
      </div>
    </div>
  );
};
