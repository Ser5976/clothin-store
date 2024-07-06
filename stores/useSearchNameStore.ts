import { FavoritesItemsStoreType } from '../types/type_favorites_items_store';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type SearchNameStoreType = {
  searchName: string;
  setSearchName: (data: string) => void;
};

// стор для передачи  поискового слова на станицу search
export const useSearchNameStore = create<SearchNameStoreType>()(
  persist(
    (set, get) => ({
      searchName: '',
      setSearchName: (data) => set({ searchName: data }),
    }),
    {
      name: 'search-name-storage', // name of item in the storage (must be unique)
      /*  storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        favouritesStore: state.favouritesStore,
      }), */
    }
  )
);
