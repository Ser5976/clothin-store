import { getCategories } from '@/actions/get_categories';
import { getCustomers } from '@/actions/get_customers';
import { getRequisites } from '@/actions/get_requisites';
import { getUser } from '@/actions/get_user';
import { authOptions } from '@/app/api/auth/config/auth_options';
import { getServerSession } from 'next-auth';
import { BottomBar } from './bottombar/bottombar';
import { MedianBar } from './medianbar/medianbar';
import { TopBar } from './topbar/topbar';

async function NavBar() {
  const session = await getServerSession(authOptions);
  //т.к. запросы через fetch на внутренний API(т.е. свои обработчики маршрутов)
  //из серверных компонентов макета(NavBar и др.)
  // не проходят при build, делаем запросы напрямую к базе
  // используем cache  для кэширование данных.
  const requisitesPromise = getRequisites();
  const customersPromise = getCustomers();
  const categoriesPromise = getCategories();
  const userPromise = session ? getUser(session.user.id) : undefined;
  // при помощи промиса делаем так, чтобы все запросы на этой странице были параллельными, а не последовательными
  // это улучшает скорость закрузки, хотя что то не заметно
  const [requisites, customers, categories, user] = await Promise.all([
    requisitesPromise,
    customersPromise,
    categoriesPromise,
    userPromise,
  ]);

  return (
    <header className=" shadow ">
      <TopBar
        avatar={user?.image}
        email={user?.email}
        categories={categories}
        customers={customers}
        requisites={requisites}
      />
      <MedianBar categories={categories} />
      <BottomBar />
    </header>
  );
}

export default NavBar;
