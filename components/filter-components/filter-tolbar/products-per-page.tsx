import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from './filter-tolbar.module.css';

export const ProductsPerPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams); //метод  jsдля работы search параметрами адресной строки

  const [limit, setLimit] = useState(() =>
    searchParams.get('limit') ? Number(searchParams.get('limit')) : 10
  );
  //посылаем данные лимита в адресную строку,а это приведёт к запросу
  // думал сделать это с помощью useEffect(),
  //но почему то при переходе на поисковую страницу в адресной страницы появляся двойной дефолтный лимит
  // поэтому сделал так
  const sendLimit = (marker: string) => {
    const quantity = marker === 'plus' ? limit + 1 : limit - 1;
    if (searchParams.get('limit')) {
      params.set('limit', String(quantity));
    } else {
      params.append('limit', String(quantity));
    }
    router.push(`${pathname}?${params}`);
  };

  const plusOne = () => {
    sendLimit('plus');
    setLimit((per) => per + 1);
  };
  const minusOne = () => {
    if (limit === 1) return;
    sendLimit('minus');
    setLimit((per) => per - 1);
  };

  return (
    <div className=" flex gap-1 items-center">
      <div className={styles.limit_wrapper}>
        <div className={styles.limit}>{limit}</div>
        <div className={styles.limit_icons}>
          <ArrowBigUp
            size={16}
            color="#17696A"
            className=" cursor-pointer mb-[-2px] fill-cyan-800 transition-colors hover:fill-cyan-900 "
            onClick={plusOne}
          />
          <ArrowBigDown
            size={16}
            color="#17696A"
            className=" cursor-pointer mt-[-2px]  fill-cyan-800 transition-colors hover:fill-cyan-900 "
            onClick={minusOne}
          />
        </div>
      </div>
      <div className=" text-xs sm:text-sm">per page</div>
    </div>
  );
};
