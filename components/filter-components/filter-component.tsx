import { cn } from '@/lib/utils';
import { BrandType } from '@/types/brand_type';
import { CategoryType } from '@/types/category_type';
import { ColorType } from '@/types/color_type';
import { MaterialType } from '@/types/material_type';
import { ProductFilterType } from '@/types/product_filter_type';
import { SizeType } from '@/types/size_type';
import { TypeType } from '@/types/type_type';
import { Loader } from 'lucide-react';
import React, { FC, useState } from 'react';
import CardProduct from '../card-product/card-product';
import FilterTolbar from './filter-tolbar/filter-tolbar';
import { Filter } from './filter/filter';

type FilterComponentType = {
  isLoading: boolean;
  isError: boolean;
  filteredProducts: ProductFilterType | undefined;
  categories: CategoryType[] | undefined | null;
  materials: MaterialType[] | undefined;
  colors: ColorType[] | undefined;
  sizes: SizeType[] | undefined;
  brands: BrandType[] | undefined;
  types: TypeType[] | undefined | null;
};

export const FilterComponent: FC<FilterComponentType> = ({
  isError,
  isLoading,
  filteredProducts,
  categories,
  materials,
  colors,
  sizes,
  brands,
  types,
}) => {
  const [openFilter, setOpenFilter] = useState(true);
  return (
    <div>
      <FilterTolbar
        pageQty={filteredProducts?.pageQty}
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        categories={categories}
        materials={materials}
        colors={colors}
        types={types}
        brands={brands}
        sizes={sizes}
      />
      <div className=" flex gap-8 min-h-screen">
        <div
          className={cn(openFilter ? 'hidden md:block grow w-1/4' : 'hidden')}
        >
          <Filter
            categories={categories}
            materials={materials}
            colors={colors}
            types={types}
            brands={brands}
            sizes={sizes}
          />
        </div>
        <div
          className={cn(
            ' relative grow self-start gap-y-8 gap-x-4',
            openFilter
              ? 'w-3/4 grid grid-cols-2 md:grid-cols-3'
              : 'w-full grid grid-cols-2 md:grid-cols-4 '
          )}
        >
          {isError ? (
            <div className=" absolute top-0 left-[30%] text-lg text-center text-red-700 ">
              {' '}
              Something went wrong
            </div>
          ) : isLoading ? (
            <div className=" absolute top-0 left-[50%] w-[32px] lg:w-[50px]  my-[50px] animate-spin">
              <Loader size={32} color="#17696a" />
            </div>
          ) : filteredProducts?.product.length === 0 ? (
            <div className=" absolute top-0 left-[30%]  text-lg text-center ">
              Nothing was found
            </div>
          ) : (
            filteredProducts?.product.map((product) => {
              return (
                <div key={product.id} className=" ">
                  <CardProduct product={product} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
