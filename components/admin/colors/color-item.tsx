import React from 'react';
import { RotateCw, X } from 'lucide-react';
import { ColorType } from '@/types/color_type';
import { useColorDelete } from '@/react-queries/admin/useColorDelete';
import { ModalUpdateColor } from './modal-color/modal-update-color';

export const ColorItem = ({ color }: { color: ColorType }) => {
  //кастомный хук useMutation, удаляет цвет
  const mutationDeleteColor = useColorDelete();
  // удаление цвета
  const colorDelete = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete color ${color.name}`
    );
    if (userConfirmed) {
      mutationDeleteColor.mutate(color.id);
    }
  };
  return (
    <div className=" flex items-center  justify-between border-t border-gray-400  text-gray-400 h-10  ">
      <div className="flex items-center  gap-4">
        <div
          className="w-5 h-5 border border-gray-700 rounded-full"
          style={{ backgroundColor: color.value }}
        ></div>
        <div className=" flex gap-1">
          <div className="">{color.name}</div>
          <span>/</span>
          <div className="">{color.value}</div>
        </div>
      </div>

      <div className=" flex gap-3">
        <ModalUpdateColor color={color} />
        <div className="">
          {mutationDeleteColor.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={colorDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
