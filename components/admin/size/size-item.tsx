import React from 'react';
import { RotateCw, X } from 'lucide-react';
import { SizeType } from '../../../types/size_type';
import { useSizeDelete } from '@/react-queries/admin/useSizeDelete';
import { ModalUpdateSize } from './modal-size/modal-update-size';

export const SizeItem = ({ size }: { size: SizeType }) => {
  //кастомный хук useMutation, удаляет размер
  const mutationDeleteSize = useSizeDelete();
  // удаление размера
  const sizeDelete = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete size ${size.value}`
    );
    if (userConfirmed) {
      mutationDeleteSize.mutate(size.id);
    }
  };
  return (
    <div className=" flex justify-between border-t border-gray-400  text-gray-400 ">
      <div>{size.value}</div>

      <div className=" flex gap-3">
        <ModalUpdateSize size={size} />
        <div className="">
          {mutationDeleteSize.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={sizeDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
