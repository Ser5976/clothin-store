import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { memo } from 'react';
import styles from './filter-tolbar.module.css';
import PaginationFilter from './pagination/pagination-filter';
import { ProductsPerPage } from './products-per-page';
import { SortBy } from './sort-by';

const FilterTolbar = ({ pageQty }: { pageQty: number | undefined }) => {
  return (
    <div className={styles.container}>
      <div className=" order-3 md:order-1 justify-self-start w-full">
        <Button className={styles.button_filter}>
          <Image src="/filter/filter-1.svg" alt="cart" width={14} height={14} />
          Show filters
        </Button>
      </div>
      <div className="justify-self-end order-4 md:order-2 md:justify-self-center">
        <SortBy />
      </div>
      <div className=" justify-self-start order-1   md:order-3 ">
        <ProductsPerPage />
      </div>
      {pageQty ? (
        pageQty <= 1 ? null : (
          <div className=" justify-self-end  order-2 md:order-4 ">
            <PaginationFilter pageQty={pageQty} />
          </div>
        )
      ) : null}
    </div>
  );
};

export default memo(FilterTolbar);
