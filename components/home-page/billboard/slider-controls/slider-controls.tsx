import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import styles from './slider-controls.module.css';
type SliderControlsPropsType = {
  index: number;
  selectedIndex: number;
  scrollTo: (index: number) => void;
};

export const SliderControls: FC<SliderControlsPropsType> = ({
  index,
  selectedIndex,
  scrollTo,
}) => {
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.activ]: index === selectedIndex,
      })}
      onClick={() => {
        scrollTo(index);
      }}
    >
      0{index + 1}
    </div>
  );
};
