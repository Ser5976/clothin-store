import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DeliveryType } from '@/types/delivery_type';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { DeliveryForm } from './delivery-form';

export const ModalUpdateDelivery = ({
  delivery,
}: {
  delivery: DeliveryType;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = async (isOpen: boolean) => {
    setIsOpen(isOpen);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
        handleModalClose(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Pencil size={18} className=" hover:text-gray-800 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Updating the delivery</DialogTitle>
        </DialogHeader>
        <DeliveryForm setIsOpen={setIsOpen} delivery={delivery} />
      </DialogContent>
    </Dialog>
  );
};
