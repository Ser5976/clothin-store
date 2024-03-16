import { MoveLeft, MoveRight } from 'lucide-react';
import { FC } from 'react';
import styles from './product-gallery.module.css';

type ArrowsPropsType = {
  prevArrow: () => void;
  nextArrow: () => void;
};

export const Arrows: FC<ArrowsPropsType> = ({ prevArrow, nextArrow }) => {
  return (
    <div>
      <div className={styles.arrows_right} onClick={nextArrow}>
        <MoveRight size={16} strokeWidth={2} color="#17696A" />
      </div>
      <div className={styles.arrows_left} onClick={prevArrow}>
        <MoveLeft size={16} strokeWidth={2} color="#17696A" />
      </div>
    </div>
  );
};
