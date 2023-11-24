import { Dispatch, FC, SetStateAction } from 'react';
import styles from './burger.module.css';
import { cn } from '@/lib/utils';

interface BurgerProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const Burger: FC<BurgerProps> = ({ show, setShow }) => {
  return (
    <div
      className={cn(!show ? styles.burger : styles.invisible)}
      onClick={() => setShow(true)}
    >
      <div className={styles.rectangel}></div>
      <div className={styles.rectangel}></div>
      <div className={styles.rectangel}></div>
    </div>
  );
};

export default Burger;
