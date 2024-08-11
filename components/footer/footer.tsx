import { getCustomers } from '@/actions/get_customers';
import { getRequisites } from '@/actions/get_requisites';
import { TopFooter } from './top-footer/top-footer';
import { BottomFooter } from './bottom-footer/bottom-footer';
import { getSoreReviews } from '@/actions/get_store_reviews';
import { WriteToUs } from './write-to-us/write-to-us';
import { Suspense } from 'react';

const Footer = async () => {
  const requisitesPromise = getRequisites();
  const customersPromise = getCustomers();
  const storeReviewsPromise = getSoreReviews();
  // при помощи промиса делаем так, чтобы все запросы на этой странице были параллельными, а не последовательными
  // это улучшает скорость закрузки, хотя что то не заметно
  const [requisites, customers, storeReviews] = await Promise.all([
    requisitesPromise,
    customersPromise,
    storeReviewsPromise,
  ]);

  return (
    <section className="bg-[#1E212C]">
      <Suspense>
        <WriteToUs reviews={storeReviews[0]} />
      </Suspense>
      <Suspense>
        <TopFooter requisites={requisites} customers={customers} />
      </Suspense>
      <BottomFooter />
    </section>
  );
};

export default Footer;
