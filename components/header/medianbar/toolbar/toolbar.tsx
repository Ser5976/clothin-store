'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ToolbarSkeleton } from './skeletons/slider-newArrivals-skeleton/toolbar-skeleton';
import { ToolbarFavourites } from './toolbar-favourites';
import styles from './toolbar.module.css';

export const ToolBar = () => {
  //этот компонент интерактивный и он не синхронизирован с сервером(т.е. данные из zustand),
  //поэтому пришлось извращаться: делать кастыль ,чтобы next не ругался, скелетон,
  //чтобы при перезагрузке небыло пустот
  //это кастыль, чтобы предотвратить конфликт с сервером, компонент рендериться на сревере и на клиенте
  // на сервере у компонента не будет данных из стора, поэтому конфликт
  //при помощи этого кастыля мы не рендерим компонент на сервере ,изменённые данные из zustand не попадают на сервер
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <ToolbarSkeleton />;
  }
  //console.log('toolbar render:');
  return (
    <div className={styles.toolbar}>
      <ToolbarFavourites />
      <div className={styles.divider}></div>
      <div className={styles.cart}>
        <Image src="/header/cart.svg" alt="cart" width={20.63} height={18.79} />
        <div className={styles.badge_cart}>14</div>
      </div>
    </div>
  );
};
