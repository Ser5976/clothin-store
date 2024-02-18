import { getCustomers } from '@/actions/get_customers';
import { getRequisites } from '@/actions/get_requisites';
import { TopFooter } from './top-footer/top-footer';
import { BottomFooter } from './bottom-footer/bottom-footer';

const Footer = async () => {
  const requisitesPromise = getRequisites();
  const customersPromise = getCustomers();
  // при помощи промиса делаем так, чтобы все запросы на этой странице были параллельными, а не последовательными
  // это улучшает скорость закрузки, хотя что то не заметно
  const [requisites, customers] = await Promise.all([
    requisitesPromise,
    customersPromise,
  ]);

  return (
    <section className="bg-[#1E212C]">
      <TopFooter requisites={requisites} customers={customers} />
      <BottomFooter />
    </section>
  );
};

export default Footer;
