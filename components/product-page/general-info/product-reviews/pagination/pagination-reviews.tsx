import styles from './pagination-reviews.module.css';
import {
  DetailedHTMLProps,
  Dispatch,
  FC,
  HTMLAttributes,
  memo,
  SetStateAction,
} from 'react';
import ReactPaginate from 'react-paginate';

type SortType = {
  oldest: boolean;
  rating: boolean;
  reset: boolean;
  page: number;
};
export interface PaginationReviewsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  pageQty: number | undefined;
  page: number;
  setSort: Dispatch<SetStateAction<SortType>>;
}
const PaginationReviews: FC<PaginationReviewsProps> = ({
  pageQty, //количество страниц
  page, //номер страницы
  setSort, //функция меняющая page в стейте
}): JSX.Element => {
  //добавляем в адресс изменённый номер страницы и формируем полный адрес
  const handlePageClick = (event: any) => {
    setSort((prev) => {
      return { ...prev, page: event.selected + 1 };
    });
  };
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
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

export default memo(PaginationReviews);
