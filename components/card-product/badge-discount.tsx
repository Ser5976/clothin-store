import { cn } from '@/lib/utils';
import styles from './card-product.module.css';
import { Heart, RotateCw } from 'lucide-react';
import { useFavouritesPost } from '@/react-queries/useFavouritesPost';
import { useSession } from 'next-auth/react';
import { useFavouritesStore } from '@/stores/useFavouritesStore';
import { useStore } from 'zustand';

export const BageDiscount = ({ discount }: { discount: string }) => {
  return <div className={styles.discount}>-{discount}%</div>;
};
