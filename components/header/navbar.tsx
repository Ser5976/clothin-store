import { getCategories } from '@/actions/get_categories';
import { getCustomers } from '@/actions/get_customers';
import { getPhone } from '@/actions/get_phone';
import { BottomBar } from './bottombar/bottombar';
import { MedianBar } from './medianbar/medianbar';
import { TopBar } from './topbar/topbar';

const NavBar = async () => {
  //т.к. запросы через fetch на внутренний API(т.е. свои обработчики маршрутов)
  //из серверных компонентов макета(NavBar и др.)
  // не проходят при build, делаем запросы напрямую к базе
  // используем cache  для кэширование данных.
  const categories = await getCategories();
  const customers = await getCustomers();
  const phone = await getPhone();

  return (
    <header className=" shadow ">
      <TopBar categories={categories} customers={customers} phone={phone} />
      <MedianBar categories={categories} />
      <BottomBar />
    </header>
  );
};

export default NavBar;
