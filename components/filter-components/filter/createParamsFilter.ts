import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { FilterStateType } from './filter';

type CreateParamsFilterType = {
  filter: FilterStateType;
  searchParams: ReadonlyURLSearchParams;
  params: URLSearchParams;
  pathname: string;
  router: AppRouterInstance;
};
// формируем параметры для адресной строки
export const createParamsFilter = ({
  filter,
  searchParams,
  params,
  pathname,
  router,
}: CreateParamsFilterType) => {
  if (filter.gender) {
    if (searchParams.get('categoryId')) {
      params.set('categoryId', filter.gender);
    } else {
      params.append('categoryId', filter.gender);
    }
  } else {
    if (searchParams.get('categoryId')) {
      params.delete('categoryId');
    }
  }
  //  с массивами немножко мароки, сначала если в стейте что-то есть(а оно уже отфильтрована на урове стейта)
  //то удаляем всё что есть в адресной строке с этим ключом
  // а потом при помощи forEach() записываем новые данные в адресную строку
  // а если стей пустой ,очищаем адресную строку
  if (filter.type.length > 0) {
    params.delete('typeId');
    filter.type.forEach((typeId) => params.append('typeId', typeId));
  } else {
    if (searchParams.getAll('typeId')) {
      params.delete('typeId');
    }
  }
  if (filter.brand.length > 0) {
    params.delete('brandId');
    filter.brand.forEach((brandId) => params.append('brandId', brandId));
  } else {
    if (searchParams.getAll('brandId')) {
      params.delete('brandId');
    }
  }
  if (filter.color.length > 0) {
    params.delete('colorId');
    filter.color.forEach((colorId) => params.append('colorId', colorId));
  } else {
    if (searchParams.getAll('colorId')) {
      params.delete('colorId');
    }
  }
  if (filter.material.length > 0) {
    params.delete('materialId');
    filter.material.forEach((materialId) =>
      params.append('materialId', materialId)
    );
  } else {
    if (searchParams.getAll('materialId')) {
      params.delete('materialId');
    }
  }
  if (filter.size.length > 0) {
    params.delete('sizeId');
    filter.size.forEach((sizeId) => params.append('sizeId', sizeId));
  } else {
    if (searchParams.getAll('sizeId')) {
      params.delete('sizeId');
    }
  }

  router.push(`${pathname}?${params}`);
};
