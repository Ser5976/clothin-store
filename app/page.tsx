import { getBillboard } from '@/actions/get_billboard';
import { getCollection } from '@/actions/get_collections';
import { getDiscount } from '@/actions/get_discount';
import { getNewArrivals } from '@/actions/get_new-arrivals';
import { getNowTrending } from '@/actions/get_now_trending';
import { getPopularTypes } from '@/actions/get_popular-types';
import { getTopCategories } from '@/actions/get_top-categories';
import Billboard from '@/components/home-page/billboard/billboard';
import { Collection } from '@/components/home-page/collection/collection';
import { Discount } from '@/components/home-page/discount/discount';
import { NewArrivals } from '@/components/home-page/new-arrivals/new-arrivals';
import { NowTrending } from '@/components/home-page/now-trending/now-trending';
import { PopularTypes } from '@/components/home-page/popular-types/popular-types';
import { TopCategories } from '@/components/home-page/top-categories/top-categories';

export default async function Home() {
  //запрос для получения billboard, на сервере при помощи fech(динамически)
  const billboards = await getBillboard();
  //запрос для получения topCategories, на сервере при помощи fech(динамически)
  const topCategories = await getTopCategories();
  //запрос для получения товаров, на сервере при помощи fech(динамически)
  const newArrivals = await getNewArrivals();
  //запрос для получения коллекции товаров , на сервере при помощи fech(динамически)
  const collections = await getCollection();
  //запрос для получения популярных типов товаров , на сервере при помощи fech(динамически)
  const popularTypes = await getPopularTypes();
  //запрос для получения товаров,которые сейчас в тренде, на сервере при помощи fech(динамически)
  const nowTrending = await getNowTrending();
  //запрос для получения товаров,которые сейчас в тренде, на сервере при помощи fech(динамически)
  const discount = await getDiscount();
  console.log('newarrivals:', newArrivals);

  return (
    <main className="flex  flex-col ">
      <Billboard billboards={billboards} />
      <TopCategories topCategories={topCategories} />
      <NewArrivals products={newArrivals.product} />
      <Collection collections={collections} />
      <PopularTypes popularTypes={popularTypes} />
      <NowTrending nowTrending={nowTrending.product} />
      <Discount discount={discount.product} />
    </main>
  );
}
