import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { BillboardForm } from './billboard-form';

export const ModalCreateBillboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className=" text-[16px] h-[35px] bg-cyan-800  hover:bg-cyan-900  max-md:text-[14px] ">
          Add a billboard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add billboard</DialogTitle>
          <DialogDescription>
            You can create no more than 4 billboards
          </DialogDescription>
        </DialogHeader>
        <BillboardForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};
