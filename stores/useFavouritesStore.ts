import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type FavouritesStoreType = {
  favouritesStore: { productId: string }[];
  setFavouritesStore: (data: { productId: string }) => void;
  clearingFavoritesStore: () => void;
  favouritesBase: { productId: string }[];
  setFavouritesBase: (data: { productId: string }[]) => void;
  refetch: any; //из-за нестабильной работы queryClient.invalidateQueries,изваращаюсь с refetch
  setRefetch: (data: any) => void;
};

export const useFavouritesStore = create<FavouritesStoreType>()(
  persist(
    (set, get) => ({
      favouritesStore: [],
      favouritesBase: [],
      refetch: null,
      setFavouritesStore: (data) => {
        // делаем копию favorites,чтобы не мутировать
        const copyFavourites = get().favouritesStore.slice();
        // ищем  такой товар в массиве favorites, при помощи findIndex
        const productIndex = copyFavourites.findIndex(
          (obj) => obj.productId === data.productId
        );
        if (productIndex === -1) {
          //товар не найден в массиве избранных,значить добавляем
          copyFavourites.push(data);
          //пепезаписываем стейт
          set(() => ({ favouritesStore: copyFavourites }));
        } else {
          //товар  найден в массиве,значить удаляем
          copyFavourites.splice(productIndex, 1);
          //пепезаписываем стейт
          set(() => ({ favouritesStore: copyFavourites }));
        }
      },
      clearingFavoritesStore: () => set({ favouritesStore: [] }),
      setFavouritesBase: (data) => set({ favouritesBase: data }),
      setRefetch: (data) => set({ refetch: data }),
    }),
    {
      name: 'favourites-storage', // name of item in the storage (must be unique)
      /*  storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        favouritesStore: state.favouritesStore,
      }), */
    }
  )
);
