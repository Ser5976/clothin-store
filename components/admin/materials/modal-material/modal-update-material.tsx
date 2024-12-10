import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MaterialType } from '@/types/material_type';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { MaterialForm } from './material-form';

export const ModalUpdateMaterial = ({
  material,
}: {
  material: MaterialType;
}) => {
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
        <MaterialForm setIsOpen={setIsOpen} material={material} />
      </DialogContent>
    </Dialog>
  );
};
