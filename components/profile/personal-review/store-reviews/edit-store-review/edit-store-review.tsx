'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { EditStoreReviewForm } from './edit-store-review-form';

type EditStoreReviewType = {
  content: string;
  id: string;
};
export const EditStoreReview = ({ content, id }: EditStoreReviewType) => {
  //открытие модального окна для редактирование имени юзера
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil
          color="#4b5563"
          className=" w-4 h-4 sm:w-6 sm:h-6  cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className=" max-w-[325px]">
        <DialogHeader>
          <DialogTitle>Edit review</DialogTitle>
          <DialogDescription>
            Make changes to your review here. Click save when you're done.
          </DialogDescription>
          <EditStoreReviewForm
            content={content}
            id={id}
            setIsOpen={setIsOpen}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
