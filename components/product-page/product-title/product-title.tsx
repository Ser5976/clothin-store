import styles from './product-title.module.css';

export const ProductTitle = ({ title }: { title: string }) => {
  return <p className={styles.title}>{title}</p>;
};
