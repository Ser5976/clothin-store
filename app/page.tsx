import { getBillboard } from '@/actions/get_billboard';
import { getCollections } from '@/actions/get_collections';
import { getDiscount } from '@/actions/get_discount';
import { getNewArrivals } from '@/actions/get_new-arrivals';
import { getPopularTypes } from '@/actions/get_popular-types';
import Billboard from '@/components/home-page/billboard/billboard';
import { Collection } from '@/components/home-page/collection/collection';
import { Discount } from '@/components/home-page/discount/discount';
import { NewArrivals } from '@/components/home-page/new-arrivals/new-arrivals';
import { NowTrending } from '@/components/home-page/now-trending/now-trending';
import { PopularTypes } from '@/components/home-page/popular-types/popular-types';

export default async function Home() {
  //запрос для получения billboard, на сервере при помощи fech(динамически)
  const billboardsPromise = getBillboard();
  //запрос для получения topCategories, на сервере при помощи fech(динамически)
  const newArrivalsPromise = getNewArrivals();
  //запрос для получения коллекции товаров , на сервере при помощи fech(динамически)
  const collectionsPromise = getCollections();
  //запрос для получения популярных типов товаров , на сервере при помощи fech(динамически)
  const popularTypesPromise = getPopularTypes();
  //запрос для получения товаров,которые сейчас в тренде, на сервере при помощи fech(динамически)
  const discountPromise = getDiscount();
  //запрос для получения отзывов о магазине, на сервере при помощи fech(динамически)
  // это улучшает скорость закрузки
  const [billboards, collections, discount, newArrivals, popularTypes] =
    await Promise.all([
      billboardsPromise,
      collectionsPromise,
      discountPromise,
      newArrivalsPromise,
      popularTypesPromise,
    ]);

  // console.log('purchasedGoods:', purchasedGoods);
  return (
    <main className="flex  flex-col overflow-x-hidden ">
      <Billboard billboards={billboards} />
      <NewArrivals products={newArrivals} />
      <Collection collections={collections} />
      <PopularTypes popularTypes={popularTypes} />
      <NowTrending />
      <Discount discount={discount} />
    </main>
  );
}
