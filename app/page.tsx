import { getBillboard } from '@/actions/get_billboard';
import { getNewArrivals } from '@/actions/get_newArrivals';
import { getTopCategories } from '@/actions/get_topCategories';
import Carousel from '@/components/home-page/carousel/carousel';
import { NewArrivals } from '@/components/home-page/new-arrivals/new-arrivals';
import { TopCategories } from '@/components/home-page/top-categories/top-categories';

export default async function Home() {
  //запрос для получения billboard, на сервере при помощи fech(динамически)
  const billboard = await getBillboard();
  //запрос для получения topCategories, на сервере при помощи fech(динамически)
  const topCategories = await getTopCategories();
  //запрос для получения товаров, на сервере при помощи fech(динамически)
  const newArrivals = await getNewArrivals();
  return (
    <main className="flex  flex-col ">
      <Carousel billboard={billboard} />
      <TopCategories topCategories={topCategories} />
      <NewArrivals products={newArrivals.product} />
    </main>
  );
}
