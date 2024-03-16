import { getNewArrivals } from '@/actions/get_new-arrivals';

const NewArrivals = async () => {
  //запрос для получения товаров, на сервере при помощи fech(динамически)
  const newArrivals = await getNewArrivals();
  return <div>new arrivels</div>;
};

export default NewArrivals;
