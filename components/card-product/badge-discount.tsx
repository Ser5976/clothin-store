import styles from './card-product.module.css';

export const BageDiscount = ({ discount }: { discount: string }) => {
  return <div className={styles.discount}>-{discount}%</div>;
};
