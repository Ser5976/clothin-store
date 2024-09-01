import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { BrandType } from '@/types/brand_type';
import { CategoryType } from '@/types/category_type';
import { ColorType } from '@/types/color_type';
import { MaterialType } from '@/types/material_type';
import { SizeType } from '@/types/size_type';
import { TypeType } from '@/types/type_type';
import Image from 'next/image';
import { FC } from 'react';
import { Filter } from './filter';

type FilterMobileType = {
  categories: CategoryType[] | undefined | null;
  materials: MaterialType[] | undefined;
  colors: ColorType[] | undefined;
  sizes: SizeType[] | undefined;
  brands: BrandType[] | undefined;
  types: TypeType[] | undefined | null;
};

export const FilterMobile: FC<FilterMobileType> = ({
  categories,
  materials,
  colors,
  sizes,
  brands,
  types,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="text-center text-white text-xs w-[120px] 
           bg-cyan-800 hover:bg-cyan-900  flex gap-2
            sm:w-[150px] sm:text-sm"
        >
          <Image src="/filter/filter-1.svg" alt="cart" width={14} height={14} />
          Show filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetClose asChild>
            <SheetTitle className=" mb-8  ">
              <Button
                variant="outline"
                className="border border-input border-cyan-800"
              >
                Apply filtres{' '}
              </Button>
            </SheetTitle>
          </SheetClose>
        </SheetHeader>
        <div className="custom-scroll-filters-mobile  px-4 pb-12">
          <Filter
            categories={categories}
            materials={materials}
            colors={colors}
            types={types}
            brands={brands}
            sizes={sizes}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
