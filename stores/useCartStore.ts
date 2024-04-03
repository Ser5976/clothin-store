import { create } from 'zustand';

export type CartStoreType = {
  //цвет товара,понадобиться при формировани объекта продукта, для корзины и для активного стиля выбранного цвета
  colorName: string;
  setColorName: (data: string) => void;
  //тоже только для размера товара
  sizeName: string;
  setSizeName: (data: string) => void;
};

export const useCartStore = create<CartStoreType>((set, get) => ({
  colorName: '',
  sizeName: '',
  setColorName: (data) => set({ colorName: data }),
  setSizeName: (data) => set({ sizeName: data }),
}));
