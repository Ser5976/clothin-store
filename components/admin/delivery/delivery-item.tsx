import React from 'react';
import { RotateCw, X } from 'lucide-react';
import { DeliveryType } from '@/types/delivery_type';
import { useDeliveryDelete } from '@/react-queries/admin/useDeliveryDelete';
import { ModalUpdateDelivery } from './modal-delivery/modal-update-delivery';

export const DeliveryItem = ({ delivery }: { delivery: DeliveryType }) => {
  //кастомный хук useMutation, удаляет delivery
  const mutationDeleteDelivery = useDeliveryDelete();
  // удаление биллборда
  const deliverydDelete = async () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete delivery information`
    );
    if (userConfirmed) {
      mutationDeleteDelivery.mutate(delivery.id);
    }
  };
  return (
    <div className=" flex items-center justify-between border-t border-gray-400  text-gray-400 h-10 ">
      <div>Delivery information</div>

      <div className=" flex gap-3">
        <ModalUpdateDelivery delivery={delivery} />
        <div className="">
          {mutationDeleteDelivery.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={deliverydDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
