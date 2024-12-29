import React from 'react';
import { RotateCw, X } from 'lucide-react';
import { BillboardType } from '@/types/carousel_type';
import { useBillboardDelete } from '@/react-queries/admin/useBillboardDelete';
import { ModalUpdateBillboard } from './modal-billboard/modal-update-billboard';
import { deleteImg } from '@/utils/utapi-delete';

export const BillboardItem = ({ billboard }: { billboard: BillboardType }) => {
  //кастомный хук useMutation, удаляет биллборт
  const mutationDeleteBillboard = useBillboardDelete();
  // удаление биллборда
  const billboardDelete = async () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete billboard ${billboard.subTitle}`
    );
    if (userConfirmed) {
      mutationDeleteBillboard.mutate(billboard.id);
      await deleteImg(billboard.image.fileKey);
    }
  };
  return (
    <div className=" flex items-center justify-between border-t border-gray-400  text-gray-400 h-10 ">
      <div>{billboard.subTitle}</div>

      <div className=" flex gap-3">
        <ModalUpdateBillboard billboard={billboard} />
        <div className="">
          {mutationDeleteBillboard.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={billboardDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
