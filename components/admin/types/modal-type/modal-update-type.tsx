import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TypeType } from '@/types/type_type';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { TypeForm } from './type-form';

export const ModalUpdateType = ({ type }: { type: TypeType }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil size={18} className=" hover:text-gray-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Updating the type</DialogTitle>
        </DialogHeader>
        <TypeForm setIsOpen={setIsOpen} type={type} />
      </DialogContent>
    </Dialog>
  );
};
