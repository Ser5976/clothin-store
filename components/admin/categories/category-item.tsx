import React from 'react';
import { RotateCw, X } from 'lucide-react';
import { CategoryType } from '@/types/category_type';
import { useCategoryDelete } from '@/react-queries/admin/useCategoryDelete';
import { ModalUpdateCategory } from './modal-category/modal-update-category';

export const CategoryItem = ({ category }: { category: CategoryType }) => {
  //кастомный хук useMutation, удаляет категорию
  const mutationDeleteCategory = useCategoryDelete();
  // удаление категории
  const categoryDelete = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete category ${category.name}`
    );
    if (userConfirmed) {
      mutationDeleteCategory.mutate(category.id);
    }
  };
  return (
    <div className=" flex items-center justify-between border-t border-gray-400  text-gray-400 h-10 ">
      <div>{category.name}</div>

      <div className=" flex gap-3">
        <ModalUpdateCategory category={category} />
        <div className="">
          {mutationDeleteCategory.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={categoryDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
