import { getCustomers } from '@/actions/get_customers';
import { getRequisites } from '@/actions/get_requisites';
import { TopFooter } from './top-footer/top-footer';
import { BottomFooter } from './bottom-footer/bottom-footer';
import { getStoreReviews } from '@/actions/get_store_reviews';
import { WriteToUs } from './write-to-us/write-to-us';
import { Suspense } from 'react';

const Footer = async () => {
  const requisitesPromise = getRequisites();
  const customersPromise = getCustomers();
  const storeReviewsPromise = getStoreReviews();
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
        {storeReviews ? (
          <WriteToUs reviews={storeReviews[0]} />
        ) : (
          <div className=" text-red-500"> Error! No data received</div>
        )}
      </Suspense>
      <Suspense>
        <TopFooter requisites={requisites} customers={customers} />
      </Suspense>
      <BottomFooter />
    </section>
  );
};

export default Footer;
