import { cn } from '@/lib/utils';
import { BrandType } from '@/types/brand_type';
import { CategoryType } from '@/types/category_type';
import { ColorType } from '@/types/color_type';
import { MaterialType } from '@/types/material_type';
import { ProductFilterType } from '@/types/product_filter_type';
import { SizeType } from '@/types/size_type';
import { TypeType } from '@/types/type_type';
import React, { FC, useState } from 'react';
import CardProduct from '../card-product/card-product';
import FilterTolbar from './filter-tolbar/filter-tolbar';
import { Filter } from './filter/filter';

type FilterComponentType = {
  filteredProducts: ProductFilterType | undefined;
  categories: CategoryType[] | undefined;
  materials: MaterialType[] | undefined;
  colors: ColorType[] | undefined;
  sizes: SizeType[] | undefined;
  brands: BrandType[] | undefined;
  types: TypeType[] | undefined;
};

export const FilterComponent: FC<FilterComponentType> = ({
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
            'grow self-start gap-y-8 gap-x-4',
            openFilter
              ? 'w-3/4 grid grid-cols-2 md:grid-cols-3'
              : 'w-full grid grid-cols-2 md:grid-cols-4 '
          )}
        >
          {filteredProducts?.product.map((product) => {
            return (
              <div key={product.id} className=" ">
                <CardProduct product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
