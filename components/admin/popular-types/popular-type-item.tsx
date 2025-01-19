import React from 'react';
import { RotateCw, X } from 'lucide-react';
import { deleteImg } from '@/utils/utapi-delete';
import { usePopularTypeDelete } from '@/react-queries/admin/usePopularTypeDelete';
import { PopularTypesType } from '@/types/popular_types_type';
import { ModalUpdatePopularType } from './modal-popular-type/modal-update-popular-type';

export const PopularTypeItem = ({
  popularType,
}: {
  popularType: PopularTypesType;
}) => {
  //кастомный хук useMutation, удаляет popular type
  const mutationDeletePopularType = usePopularTypeDelete();
  // удаление биллборда
  const popularTypeDelete = async () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete billboard ${popularType.title}`
    );
    if (userConfirmed) {
      mutationDeletePopularType.mutate(popularType.id);
      await deleteImg(popularType.image.fileKey);
    }
  };
  return (
    <div className=" flex items-center justify-between border-t border-gray-400  text-gray-400 h-10 ">
      <div>{popularType.title}</div>

      <div className=" flex gap-3">
        <ModalUpdatePopularType popularType={popularType} />
        <div className="">
          {mutationDeletePopularType.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={popularTypeDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
