'use client';
import { useHeaderStore } from '@/stores/useHeaderStore';
import { CategoryType } from '@/types/category_type';
import { CustomersType } from '@/types/customers_type';
import { PhoneType } from '@/types/phone_type';
import React, { useRef } from 'react';

type StoreHeaderInitializerType = {
  categories: CategoryType[] | undefined;
  customers: CustomersType[] | undefined;
  phone: PhoneType[] | undefined;
};

// клиентский компонент специально сделанный для того,
//чтобы передать данные полученные в серверном клмпонете в store(zustand)
const StoreHeaderInitializer = ({
  categories,
  customers,
  phone,
}: StoreHeaderInitializerType) => {
  //ref используем, чтобы блокировать повторное изменение
  let initializer = useRef(false);

  if (!initializer.current) {
    useHeaderStore.setState({
      categories: categories ?? [],
      customers: customers ?? [],
      phone: phone ?? [],
    });

    initializer.current = true;
  }

  return null;
};

export default StoreHeaderInitializer;
/*  //это кастыль, чтобы предотвратить конфликт с сервером
  // компонет рендериться на сревере и на клиенте
  // на сервере у компонента не будет данных из стора, поэтому конфликт
  // при помощи этого кастыля мы не рендерим компонент на сервере
  // точно не уверен, как понял
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  } */
