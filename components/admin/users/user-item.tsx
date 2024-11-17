import { UserType } from '@/types/user_type';
import Link from 'next/link';
import React from 'react';
import { RotateCw, X } from 'lucide-react';
import { useUserDelete } from '@/react-queries/admin/useUserDelete';

export const UserItem = ({ user }: { user: UserType }) => {
  //кастомный хук useMutation, удаляет товар из базе корзины
  const mutationDeleteUser = useUserDelete();
  // удаление пользователя
  const userDelete = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete user ${user.email}`
    );
    if (userConfirmed) {
      mutationDeleteUser.mutate(user.id);
    }
  };
  return (
    <div className=" flex justify-between border-t border-gray-400 text-gray-400  ">
      <Link
        href={`/admin/users/${user.id}`}
        className=" hover:text-gray-800 cursor-pointer"
      >
        {user.email}
      </Link>
      {mutationDeleteUser.isLoading ? (
        <RotateCw size={20} className="   animate-spin" />
      ) : (
        <X
          size={20}
          className=" hover:text-gray-800 cursor-pointer"
          onClick={userDelete}
        />
      )}
    </div>
  );
};
