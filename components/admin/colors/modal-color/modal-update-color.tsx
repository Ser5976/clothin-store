import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ColorType } from '@/types/color_type';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { ColorForm } from './color-form';

export const ModalUpdateColor = ({ color }: { color: ColorType }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil size={18} className=" hover:text-gray-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Updating the color</DialogTitle>
        </DialogHeader>
        <ColorForm setIsOpen={setIsOpen} color={color} />
      </DialogContent>
    </Dialog>
  );
};
