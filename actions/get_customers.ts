import prismadb from '@/lib/prismadb';
import { cache } from 'react';
//т.к. запросы через fetch на внутренний API(т.е. свои обработчики маршрутов) из серверных компонентах макета(NavDar и др.)
// не проходят при build, делаем запросы напрямую к базе
// используем cache  для кэширование данных.
export const revalidate = 60;
export const getCustomers = cache(async () => {
  try {
    const customers = await prismadb.customers.findMany();
    return customers;
  } catch (error) {
    console.log(error);
  }
});
