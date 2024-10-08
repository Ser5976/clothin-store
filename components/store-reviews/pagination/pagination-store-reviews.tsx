import styles from './pagination-store-reviews.module.css';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const PaginationStoreReviews = ({
  pageQty,
}: {
  pageQty: number | undefined;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams); //метод  js для работы search параметрами адресной строки
  const [page, setPage] = useState(1);

  useEffect(() => {
    const numberPage = searchParams.get('page')
      ? Number(searchParams.get('page'))
      : 1;
    setPage(numberPage);
  }, [searchParams]);
  //добавляем в адресс изменённый номер страницы и формируем полный адрес
  const handlePageClick = (event: any) => {
    if (searchParams.get('page')) {
      params.set('page', String(event.selected + 1));
    } else {
      params.append('page', String(event.selected + 1));
    }
    router.push(`${pathname}?${params}`);
    setPage(event.selected + 1);
  };
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={Number(pageQty)}
      previousLabel="<"
      containerClassName={styles.pagination}
      pageLinkClassName={styles.pageNum}
      previousClassName={styles.pageNum}
      nextLinkClassName={styles.pageNum}
      activeLinkClassName={styles.active}
      disabledClassName={styles.disabled}
      forcePage={page - 1}
    />
  );
};
