import { getNowTrending } from '@/actions/get_now_trending';

const TrendingNow = async () => {
  //запрос для получения товаров,которые сейчас в тренде, на сервере при помощи fech(динамически)
  const nowTrending = await getNowTrending();
  return <div>TrendingNow</div>;
};

export default TrendingNow;
