import { create } from 'zustand';

export type ProductMenuStoreType = {
  menuActive: 'general-info' | 'reviews' | 'product-details';
  setMenuActive: (data: 'general-info' | 'reviews' | 'product-details') => void;
};

export const useProductMenuStore = create<ProductMenuStoreType>((set) => ({
  menuActive: 'general-info',
  setMenuActive: (data) => set((state) => ({ ...state, menuActive: data })),
}));
