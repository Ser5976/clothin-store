import prismadb from '@/lib/prismadb';
import { cache } from 'react';

//т.к. запросы через fetch на внутренний API(т.е. свои обработчики маршрутов) из серверных компонентах макета(NavDar и др.)
// не проходят при build, делаем запросы напрямую к базе
// используем cache  для кэширование данных.
export const getCategories = cache(async () => {
  try {
    const categories = await prismadb.category.findMany();
    return categories;
  } catch (error) {
    console.log(error);
  }
});
