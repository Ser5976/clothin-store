import { getBillboard } from '@/actions/get_billboard';
import { getCollection } from '@/actions/get_collections';
import { getNewArrivals } from '@/actions/get_newArrivals';
import { getPopularTypes } from '@/actions/get_popular-types';
import { getTopCategories } from '@/actions/get_topCategories';
import Carousel from '@/components/home-page/carousel/carousel';
import { Collection } from '@/components/home-page/collection/collection';
import { NewArrivals } from '@/components/home-page/new-arrivals/new-arrivals';
import { PopularTypes } from '@/components/home-page/popular-types/popular-types';
import { TopCategories } from '@/components/home-page/top-categories/top-categories';

export default async function Home() {
  //запрос для получения billboard, на сервере при помощи fech(динамически)
  const billboard = await getBillboard();
  //запрос для получения topCategories, на сервере при помощи fech(динамически)
  const topCategories = await getTopCategories();
  //запрос для получения товаров, на сервере при помощи fech(динамически)
  const newArrivals = await getNewArrivals();
  //запрос для получения коллекции товаров , на сервере при помощи fech(динамически)
  const collections = await getCollection();
  //запрос для получения популярных типов товаров , на сервере при помощи fech(динамически)
  const popularTypes = await getPopularTypes();

  return (
    <main className="flex  flex-col ">
      <Carousel billboard={billboard} />
      <TopCategories topCategories={topCategories} />
      <NewArrivals products={newArrivals.product} />
      <Collection collections={collections} />
      <PopularTypes popularTypes={popularTypes} />
    </main>
  );
}
