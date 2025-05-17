import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DeliveryType } from '@/types/delivery_type';
import { useState } from 'react';
import { DeliveryForm } from './delivery-form';

export const ModalCreateDelivery = ({
  delivery,
}: {
  delivery: DeliveryType | undefined;
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
        <Button className=" text-[16px] h-[35px] bg-cyan-800  hover:bg-cyan-900  max-md:text-[14px] ">
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create delivery</DialogTitle>
          <DialogDescription>
            You can create no more than 1 delivery options
          </DialogDescription>
        </DialogHeader>
        <DeliveryForm setIsOpen={setIsOpen} delivery={delivery} />
      </DialogContent>
    </Dialog>
  );
};
