import { ToolbarCart } from './toolbar-cart';
import { ToolbarFavourites } from './toolbar-favourites';
import styles from './toolbar.module.css';

export const ToolBar = () => {
  return (
    <div className={styles.toolbar}>
      <ToolbarFavourites />
      <div className={styles.divider}></div>
      <ToolbarCart />
    </div>
  );
};
