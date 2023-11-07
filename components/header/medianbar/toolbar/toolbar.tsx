import Image from 'next/image';
import styles from './toolbar.module.css';

export const ToolBar = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.wishlist}>
        <Image src="/header/heart.svg" alt="heart" width={20} height={20} />
        <div className={styles.badge_heart}>3</div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.cart}>
        <Image src="/header/cart.svg" alt="cart" width={20.63} height={18.79} />
        <div className={styles.badge_cart}>14</div>
      </div>
    </div>
  );
};
