import React from 'react';
import { RotateCw, X } from 'lucide-react';
import { CategoryType } from '@/types/category_type';
import { useCategoryDelete } from '@/react-queries/admin/useCategoryDelete';
import { TypeType } from '@/types/type_type';
import { useTypeDelete } from '@/react-queries/admin/useTypeDelete';
import { ModalUpdateType } from './modal-type/modal-update-type';

export const TypeItem = ({ type }: { type: TypeType }) => {
  //кастомный хук useMutation, удаляет тип
  const mutationDeleteType = useTypeDelete();
  // удаление типа
  const typeDelete = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete type ${type.name}`
    );
    if (userConfirmed) {
      mutationDeleteType.mutate(type.id);
    }
  };
  return (
    <div className=" flex justify-between border-t border-gray-400  text-gray-400 ">
      <div>{type.name}</div>

      <div className=" flex gap-3">
        <ModalUpdateType type={type} />
        <div className="">
          {mutationDeleteType.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={typeDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
