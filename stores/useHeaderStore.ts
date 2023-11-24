import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CustomersType } from './../types/customers_type';
import { CategoryType } from '@/types/category_type';
import { PhoneType } from '@/types/phone_type';

type HeaderStoreType = {
  categories: CategoryType[];
  customers: CustomersType[];
  phone: PhoneType[];
  setCategories: (data: CategoryType[]) => void;
  setCustomers: (data: CustomersType[]) => void;
  setPhone: (data: PhoneType[]) => void;
};

export const useHeaderStore = create<HeaderStoreType>()(
  persist(
    (set, get) => ({
      categories: [],
      customers: [],
      phone: [],
      setCategories: (data) => set({ categories: data }),
      setCustomers: (data) => set({ customers: data }),
      setPhone: (data) => set({ phone: data }),
    }),
    {
      name: 'food-storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        categories: state.categories,
        customers: state.customers,
        phone: state.phone,
      }),
    }
  )
);
