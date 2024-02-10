import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import React, { FC } from 'react';
import styles from './arrows.module.css';

type PropType = {
  scrollNext: () => void;
  scrollPrev: () => void;
};

export const Arrows: FC<PropType> = ({ scrollPrev, scrollNext }) => {
  return (
    <div className={styles.container}>
      <Button
        size="icon"
        variant="outline"
        className={styles.prev}
        onClick={scrollPrev}
      >
        <ArrowLeftIcon className={styles.left} />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className={styles.next}
        onClick={scrollNext}
      >
        <ArrowRightIcon className={styles.right} />
      </Button>
    </div>
  );
};
