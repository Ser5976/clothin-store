import { getBillboard } from '@/actions/get_billboard';
import Carousel from '@/components/carousel/carousel';

export default async function Home() {
  //запрос для получения billboard, на сервере при помощи fech(динамически)
  const billboard = await getBillboard();
  return (
    <main className="flex  flex-col ">
      <Carousel billboard={billboard} />
    </main>
  );
}
