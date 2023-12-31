import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type FavouritesStoreType = {
  favourites: { productId: string }[];
  setFavourites: (data: { productId: string }) => void;
  clearingFavorites: () => void;
};

export const useFavouritesStore = create<FavouritesStoreType>()(
  persist(
    (set, get) => ({
      favourites: [],
      setFavourites: (data) => {
        // делаем копию favorites,чтобы не мутировать
        const copyFavourites = get().favourites.slice();
        // ищем  такой товар в массиве favorites, при помощи findIndex
        const productIndex = copyFavourites.findIndex(
          (obj) => obj.productId === data.productId
        );
        if (productIndex === -1) {
          //товар не найден в массиве избранных,значить добавляем
          copyFavourites.push(data);
          //пепезаписываем стейт
          set(() => ({ favourites: copyFavourites }));
        } else {
          //товар  найден в массиве,значить удаляем
          copyFavourites.splice(productIndex, 1);
          //пепезаписываем стейт
          set(() => ({ favourites: copyFavourites }));
        }
      },
      clearingFavorites: () => set({ favourites: [] }),
    }),
    {
      name: 'favourites-storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        favourites: state.favourites,
      }),
    }
  )
);
