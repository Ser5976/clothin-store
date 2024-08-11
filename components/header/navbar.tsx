import { getCategories } from '@/actions/get_categories';
import { getCustomers } from '@/actions/get_customers';
import { getRequisites } from '@/actions/get_requisites';
import { Suspense } from 'react';
import { BottomBar } from './bottombar/bottombar';
import { MedianBar } from './medianbar/medianbar';
import { TopBar } from './topbar/topbar';

async function NavBar() {
  //т.к. запросы через fetch на внутренний API(т.е. свои обработчики маршрутов)
  //из серверных компонентов макета(NavBar и др.)
  // не проходят при build, делаем запросы напрямую к базе
  // используем cache  для кэширование данных.
  const requisitesPromise = getRequisites();
  const customersPromise = getCustomers();
  const categoriesPromise = getCategories();
  // при помощи промиса делаем так, чтобы все запросы на этой странице были параллельными, а не последовательными
  // это улучшает скорость закрузки, хотя что то не заметно
  const [requisites, customers, categories] = await Promise.all([
    requisitesPromise,
    customersPromise,
    categoriesPromise,
  ]);

  return (
    <header className=" shadow ">
      <Suspense>
        <TopBar
          categories={categories}
          customers={customers}
          requisites={requisites}
        />
      </Suspense>
      <Suspense>
        <MedianBar categories={categories} />
      </Suspense>
      <BottomBar />
    </header>
  );
}

export default NavBar;
