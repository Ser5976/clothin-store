import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BrandType } from '@/types/brand_type';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { BrandForm } from './brand-form';

export const ModalUpdateBrand = ({ brand }: { brand: BrandType }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil size={18} className=" hover:text-gray-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Updating the brand</DialogTitle>
        </DialogHeader>
        <BrandForm setIsOpen={setIsOpen} brand={brand} />
      </DialogContent>
    </Dialog>
  );
};
