import { cn } from '@/lib/utils';
import React, { Dispatch, FC, SetStateAction } from 'react';
import styles from './slider-controls.module.css';
type SliderControlsPropsType = {
  index: number;
  currentIndex: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  goToSlide: (index: number) => void;
};

export const SliderControls: FC<SliderControlsPropsType> = ({
  index,
  currentIndex,
  setCurrentSlide,
  goToSlide,
}) => {
  console.log('currentIndex:', currentIndex);
  console.log('index:', index);
  return (
    <div
      className={cn(styles.wrapper, { [styles.activ]: index === currentIndex })}
      onClick={() => {
        goToSlide(index);
        setCurrentSlide(index);
      }}
    >
      0{index + 1}
    </div>
  );
};
