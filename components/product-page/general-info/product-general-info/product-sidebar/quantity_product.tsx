import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import styles from './product-sidebar.module.css';

export const QuantityProduct = () => {
  return (
    <div className={styles.quantity_wrapper}>
      <div className={styles.quantity}>1</div>
      <div className={styles.quantity_icons}>
        <ArrowBigUp
          size={18}
          color="#17696A"
          className=" cursor-pointer mb-[-2px] fill-cyan-800 transition-colors hover:fill-cyan-900 "
        />
        <ArrowBigDown
          size={18}
          color="#17696A"
          className=" cursor-pointer mt-[-2px]  fill-cyan-800 transition-colors hover:fill-cyan-900 "
        />
      </div>
    </div>
  );
};
