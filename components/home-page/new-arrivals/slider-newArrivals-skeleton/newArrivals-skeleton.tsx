import { Skeleton } from '@/components/ui/skeleton';
import styles from './newArrivals-skeleton.module.css';

export const NewArrialsSkeleton = () => {
  return (
    <div className={styles.row}>
      {new Array(6).fill(1).map((_, i) => {
        return (
          <div className={styles.wrapper_card} key={i}>
            <Skeleton className={styles.header} />
            <div className={styles.footer}>
              <Skeleton className={styles.name_product} />
              <Skeleton className={styles.price} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
