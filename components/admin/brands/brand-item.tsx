import React from 'react';
import { RotateCw, X } from 'lucide-react';
import { BrandType } from '@/types/brand_type';
import { useBrandDelete } from '@/react-queries/admin/useBrandDelete';
import { ModalUpdateBrand } from './modal-brand/modal-update-brand';

export const BrandItem = ({ brand }: { brand: BrandType }) => {
  //кастомный хук useMutation, удаляет брэнд
  const mutationDeleteBrand = useBrandDelete();
  // удаление брэнда
  const brandDelete = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete brand ${brand.name}`
    );
    if (userConfirmed) {
      mutationDeleteBrand.mutate(brand.id);
    }
  };
  return (
    <div className=" flex items-center justify-between border-t border-gray-400  text-gray-400 h-10 ">
      <div>{brand.name}</div>

      <div className=" flex gap-3">
        <ModalUpdateBrand brand={brand} />
        <div className="">
          {mutationDeleteBrand.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={brandDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
