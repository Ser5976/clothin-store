import { getCustomers } from '@/actions/get_customers';
import { getRequisites } from '@/actions/get_requisites';
import { TopFooter } from './top-footer/top-footer';
import { BottomFooter } from './bottom-footer/bottom-footer';
import { WriteToUs } from './write-to-us/write-to-us';
import { Suspense } from 'react';

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
      <WriteToUs />
      <Suspense>
        <TopFooter requisites={requisites} customers={customers} />
      </Suspense>
      <BottomFooter />
    </section>
  );
};

export default Footer;
