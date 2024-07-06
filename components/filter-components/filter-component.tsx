import { BrandType } from '@/types/brand_type';
import { CategoryType } from '@/types/category_type';
import { ColorType } from '@/types/color_type';
import { MaterialType } from '@/types/material_type';
import { ProductFilterType } from '@/types/product_filter_type';
import { SizeType } from '@/types/size_type';
import { TypeType } from '@/types/type_type';
import React, { FC } from 'react';
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
  return (
    <div>
      <FilterTolbar pageQty={filteredProducts?.pageQty} />
      <div className="grid grid-cols-4">
        <Filter
          categories={categories}
          materials={materials}
          colors={colors}
          types={types}
          brands={brands}
          sizes={sizes}
        />
      </div>
    </div>
  );
};
