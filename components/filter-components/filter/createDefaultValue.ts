import { ReadonlyURLSearchParams } from 'next/navigation';

// создаём дефолтные значения для аккордиона,чтобы была открыта категория, где есть выделенные позиции
export const createDefaultValue = (searchParams: ReadonlyURLSearchParams) => {
  const defaultValue = [] as string[];
  if (searchParams.get('categoryId')) {
    defaultValue.push('gender');
  }
  if (searchParams.get('typeId')) {
    defaultValue.push('clothes');
  }
  if (searchParams.get('brandId')) {
    defaultValue.push('brand');
  }
  if (searchParams.get('sizeId')) {
    defaultValue.push('size');
  }
  if (searchParams.get('colorId')) {
    defaultValue.push('color');
  }
  if (searchParams.get('materialId')) {
    defaultValue.push('material');
  }
  return defaultValue;
};
