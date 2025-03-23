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
import { CategoryForm } from './category-form';

export const ModalCreateCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className=" text-[16px] h-[35px] bg-cyan-800  hover:bg-cyan-900  max-md:text-[14px] ">
          Add a category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription>
            You can create no more than 4 categories
          </DialogDescription>
        </DialogHeader>
        <CategoryForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};
