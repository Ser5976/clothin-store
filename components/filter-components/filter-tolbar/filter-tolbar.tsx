import { Button } from '@/components/ui/button';
import { BrandType } from '@/types/brand_type';
import { CategoryType } from '@/types/category_type';
import { ColorType } from '@/types/color_type';
import { MaterialType } from '@/types/material_type';
import { SizeType } from '@/types/size_type';
import { TypeType } from '@/types/type_type';
import Image from 'next/image';
import React, { FC, memo } from 'react';
import { FilterMobile } from '../filter/filter-mobile';
import styles from './filter-tolbar.module.css';
import PaginationFilter from './pagination/pagination-filter';
import { ProductsPerPage } from './products-per-page';
import { SortBy } from './sort-by';

type FilterTolbarType = {
  pageQty: number | undefined;
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  categories: CategoryType[] | undefined | null;
  materials: MaterialType[] | undefined;
  colors: ColorType[] | undefined;
  sizes: SizeType[] | undefined;
  brands: BrandType[] | undefined;
  types: TypeType[] | undefined | null;
};

//FilterTolbar  сделал без участия состояния(useState(), только с помощью URL(адресной строки))
const FilterTolbar: FC<FilterTolbarType> = ({
  pageQty,
  openFilter,
  setOpenFilter,
  categories,
  materials,
  colors,
  sizes,
  brands,
  types,
}) => {
  return (
    <div className={styles.container}>
      <div className=" order-3 md:order-1 justify-self-start w-full">
        <Button
          className={styles.button_filter}
          onClick={() => setOpenFilter((prev) => !prev)}
        >
          <Image src="/filter/filter-1.svg" alt="cart" width={14} height={14} />
          {openFilter ? <span> Close filters</span> : <span>Show filters</span>}
        </Button>
        <div className=" md:hidden">
          <FilterMobile
            categories={categories}
            materials={materials}
            colors={colors}
            types={types}
            brands={brands}
            sizes={sizes}
          />
        </div>
      </div>
      <div className="justify-self-end order-4 md:order-2 md:justify-self-center">
        <SortBy />
      </div>
      <div className=" justify-self-start order-1   md:order-3 ">
        <ProductsPerPage />
      </div>
      <div className=" justify-self-end items-  order-2 md:order-4 h-wull flex items-center ">
        {pageQty ? (
          pageQty <= 1 ? (
            <div className="text-xs sm:text-sm sm:px-1 lg:text-base flex ">
              {'<'} 1 {'>'}
            </div>
          ) : (
            <PaginationFilter pageQty={pageQty} />
          )
        ) : (
          <div className="text-xs sm:text-sm sm:px-1 lg:text-base">
            {'<'} 1 {'>'}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(FilterTolbar);
