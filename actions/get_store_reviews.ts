import prismadb from '@/lib/prismadb';
import { cache } from 'react';
//т.к. запросы через fetch на внутренний API(т.е. свои обработчики маршрутов) из серверных компонентов макета(NavDar и др.)
// не проходят при build, делаем запросы напрямую к базе
// Нашёл причину:нужно обернуть в Suspense компоненты в которых получают данные( в нашем случае это  <NavBar /> и <Footer />)
// но исправлять не стал,это вариант тоже рабочий,хотя это можно было сделать с серверными экшенами
// используем cache  для кэширование данных.
export const revalidate = 60;
export const getStoreReviews = cache(async () => {
  try {
    const storeReviews = await prismadb.storeReviews.findMany({
      include: {
        user: { select: { email: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return storeReviews;
  } catch (error) {
    console.log(error);
  }
});
