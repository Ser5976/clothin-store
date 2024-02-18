'use client';
import { ArrowUpCircle } from 'lucide-react';
import styles from './bottom-footer.module.css';

export const GoToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Добавляет плавную анимацию прокрутки
    });
  };

  return (
    <div className={styles.go_to_top}>
      <ArrowUpCircle
        strokeWidth={1}
        color="#17696A"
        className=" hidden max-sm:block"
        onClick={scrollToTop}
      />

      <div className="max-sm:hidden" onClick={scrollToTop}>
        Go to top
      </div>
    </div>
  );
};
