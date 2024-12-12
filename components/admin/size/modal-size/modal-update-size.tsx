import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SizeType } from '@/types/size_type';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { SizeForm } from './size-form';

export const ModalUpdateSize = ({ size }: { size: SizeType }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil size={18} className=" hover:text-gray-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Updating the size</DialogTitle>
        </DialogHeader>
        <SizeForm setIsOpen={setIsOpen} size={size} />
      </DialogContent>
    </Dialog>
  );
};
