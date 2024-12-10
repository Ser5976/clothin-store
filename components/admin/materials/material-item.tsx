import React from 'react';
import { RotateCw, X } from 'lucide-react';
import { MaterialType } from '../../../types/material_type';
import { useMaterialDelete } from '@/react-queries/admin/useMaterialDelete';
import { ModalUpdateMaterial } from './modal-material/modal-update-material';

export const MaterialItem = ({ material }: { material: MaterialType }) => {
  //кастомный хук useMutation, удаляет материал
  const mutationDeleteMaterial = useMaterialDelete();
  // удаление material
  const materialDelete = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete material ${material.name}`
    );
    if (userConfirmed) {
      mutationDeleteMaterial.mutate(material.id);
    }
  };
  return (
    <div className=" flex justify-between border-t border-gray-400  text-gray-400 ">
      <div>{material.name}</div>

      <div className=" flex gap-3">
        <ModalUpdateMaterial material={material} />
        <div className="">
          {mutationDeleteMaterial.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={materialDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
