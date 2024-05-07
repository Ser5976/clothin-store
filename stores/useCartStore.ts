import { CartDataType } from './../validators/cart-validator';
import { CommonCartType } from '@/types/cart_type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartStoreType = {
  cartBase: CommonCartType;
  cartItems: CartDataType;
  sumTotalPrice: number;
  sumTotalOldPrice: number | undefined;
  refetch: any; //из-за нестабильной работы queryClient.invalidateQueries,изваращаюсь с refetch
  setRefetch: (data: any) => void;
  setCartItems: (data: CartDataType) => void;
  setCartBase: (data: CommonCartType) => void;
  updateQuantityProduct: (data: {
    productId: string;
    quantity: number;
  }) => void;
  deleteProduct: (data: { productId: string }) => void;
};

export const useCartStore = create<CartStoreType>()(
  persist(
    (set, get) => ({
      cartBase: {} as CommonCartType,
      cartItems: [],
      sumTotalPrice: 0,
      sumTotalOldPrice: 0,
      refetch: null,

      //данные из базы
      setCartBase: (data) => {
        set((state) => ({ ...state, cartBase: data }));
      },
      setCartItems: (data) => {
        //проверка если в корзине ничего нет то вносим наш товар
        if (get().cartItems.length === 0) {
          set((state) => ({ ...state, cartItems: data }));
        } else {
          // если в корзине что то есть, то нам нужно добавить только те товары в корзину которых нет
          // Воспользуемся Set, это особый вид колекции. Сначала создаем Set с уникальными productId из
          //cartItems(для последующей фильтрации)
          const uniqueProductIds = new Set(
            get().cartItems.map((item) => item.productId)
          );
          // потом фильтруем наши поступившие данные
          const uniqueCartItems = data.filter(
            (item) => !uniqueProductIds.has(item.productId)
          );
          // и добавляем новые товары в нашу корзину
          set((state) => ({
            ...state,
            cartItems: [...state.cartItems, ...uniqueCartItems],
          }));
        }
        //вычисляем стоимость всех товаров и записываем в стейт
        const sumTotalPrice = get().cartItems.reduce((acc, item) => {
          return acc + item.totalPrice;
        }, 0);
        set((state) => ({
          ...state,
          sumTotalPrice,
        }));
        // вычесляем общую сумму товаров ,без скидки
        const sumTotalOldPrise = get().cartItems.reduce((acc, item) => {
          const sum = item.totalOldPrice ? item.totalOldPrice : item.totalPrice;
          return acc + sum;
        }, 0);
        set((state) => ({
          ...state,
          sumTotalOldPrice: sumTotalOldPrise > 0 ? sumTotalOldPrise : 0,
        }));
      },
      // эта логика изменения количества товара
      updateQuantityProduct: (data) => {
        const updatedCartItems = get().cartItems.map((item) => {
          if (item.productId === data.productId) {
            //изменяем количество выбранного товара
            item.quantity = data.quantity;
            //изменяем totalPrice выбранного товара
            item.totalPrice = item.price * item.quantity;
            //изменяем totalOldPrice выбранного товара
            item.totalOldPrice = item.oldPrice
              ? item.oldPrice * item.quantity
              : 0;
          }
          return item;
        });
        set((state) => ({
          ...state,
          cartItems: updatedCartItems,
        }));
        // вычисляем стоимость всех товаров и записываем в стейт
        const sumTotalPrice = get().cartItems.reduce((acc, item) => {
          return acc + item.totalPrice;
        }, 0);
        set((state) => ({
          ...state,
          sumTotalPrice,
        }));
        // вычесляем общую сумму товаров ,без скидки
        const sumTotalOldPrice = get().cartItems.reduce((acc, item) => {
          const sum = item.totalOldPrice ? item.totalOldPrice : item.totalPrice;
          return acc + sum;
        }, 0);
        set((state) => ({
          ...state,
          sumTotalOldPrice: sumTotalOldPrice > 0 ? sumTotalOldPrice : 0,
        }));
      },
      // эта логика удаление товара
      deleteProduct: (data) => {
        const updatedCartItems = get().cartItems.filter(
          (item) => item.productId !== data.productId
        );
        set((state) => ({
          ...state,
          cartItems: updatedCartItems,
        }));
        // вычисляем стоимость всех товаров и записываем в стейт
        const sumTotalPrice = get().cartItems.reduce((acc, item) => {
          return acc + item.totalPrice;
        }, 0);
        set((state) => ({
          ...state,
          sumTotalPrice,
        }));
        // вычесляем общую сумму товаров ,без скидки
        const sumTotalOldPrice = get().cartItems.reduce((acc, item) => {
          const sum = item.totalOldPrice ? item.totalOldPrice : item.totalPrice;
          return acc + sum;
        }, 0);
        set((state) => ({
          ...state,
          sumTotalOldPrice: sumTotalOldPrice > 0 ? sumTotalOldPrice : 0,
        }));
      },
      setRefetch: (data) => set({ refetch: data }),
    }),
    {
      name: 'cart-storage', // name of item in the storage (must be unique)
      /*  storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        favouritesStore: state.favouritesStore,
      }), */
    }
  )
);
