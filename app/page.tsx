import { getBillboard } from '@/actions/get_billboard';
import { getTopCategories } from '@/actions/get_topCategories';
import Carousel from '@/components/home-page/carousel/carousel';
import { TopCategories } from '@/components/home-page/top-categories/top-categories';

export default async function Home() {
  //запрос для получения billboard, на сервере при помощи fech(динамически)
  const billboard = await getBillboard();
  //запрос для получения topCategories, на сервере при помощи fech(динамически)
  const topCategories = await getTopCategories();
  return (
    <main className="flex  flex-col ">
      <Carousel billboard={billboard} />
      <TopCategories topCategories={topCategories} />
    </main>
  );
}
