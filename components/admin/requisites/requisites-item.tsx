import React from 'react';
import { RotateCw, X } from 'lucide-react';

import { RequisitesType } from '@/types/requisites_type';
import { useRequisitesDelete } from '@/react-queries/admin/useRequisitesDelete';
import { ModalUpdateRequisites } from './modal-requisites/modal-update-requisites';

export const RequisitesItem = ({
  requisites,
}: {
  requisites: RequisitesType;
}) => {
  //кастомный хук useMutation, удаляет requisites
  const mutationDeleteRequisites = useRequisitesDelete();
  // удаление requisites
  const requisitesDelete = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete brand ${requisites.phone}/${requisites.email}`
    );
    if (userConfirmed) {
      mutationDeleteRequisites.mutate(requisites.id);
    }
  };
  return (
    <div className=" flex items-center justify-between border-t border-gray-400  text-gray-400 h-10 ">
      <div>
        {requisites.phone}/{requisites.email}
      </div>

      <div className=" flex gap-3">
        <ModalUpdateRequisites requisites={requisites} />
        <div className="">
          {mutationDeleteRequisites.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={requisitesDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
