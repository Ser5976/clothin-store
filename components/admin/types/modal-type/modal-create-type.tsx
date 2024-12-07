import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { TypeForm } from './type-form';

export const ModalCreateType = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className=" text-[16px] h-[35px] bg-cyan-800  hover:bg-cyan-900  max-md:text-[14px] ">
          Add a type
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add type</DialogTitle>
        </DialogHeader>
        <TypeForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};
