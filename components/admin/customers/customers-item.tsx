import React from 'react';
import { Pencil, RotateCw, X } from 'lucide-react';
import Link from 'next/link';
import { CustomersType } from '@/types/customers_type';
import { useCustomerDelete } from '@/react-queries/admin/useCustomerDelete';

export const CustomerItem = ({ customer }: { customer: CustomersType }) => {
  //кастомный хук useMutation, удаляет страницу
  const mutationDeleteCustomer = useCustomerDelete();
  // удаление страницы
  const customerDelete = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete collection ${customer.name}`
    );
    if (userConfirmed) {
      mutationDeleteCustomer.mutate(customer.id);
    }
  };
  return (
    <div className=" flex items-center justify-between border-t border-gray-400  text-gray-400 h-10 ">
      <div>{customer.name}</div>

      <div className=" flex gap-3">
        <button
          onClick={() =>
            (window.location.href = `/admin/customers/update-customer/${customer.id}`)
          }
        >
          <Pencil size={18} className=" hover:text-gray-800 " />
        </button>
        <div className="">
          {mutationDeleteCustomer.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={customerDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
