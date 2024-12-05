import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CategoryType } from '@/types/category_type';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { CategoryForm } from './category-form';

export const ModalUpdateCategory = ({
  category,
}: {
  category: CategoryType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil size={18} className=" hover:text-gray-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Updating the category</DialogTitle>
        </DialogHeader>
        <CategoryForm setIsOpen={setIsOpen} category={category} />
      </DialogContent>
    </Dialog>
  );
};
