import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Minus, Pencil, User } from 'lucide-react';
import { PersonalForm } from './personal-form';

export const Personal = ({ name }: { name: string }) => {
  //открытие модального окна для редактирование имени юзера
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="relative flex py-3 px-5 border-b sm:px-10 text-base max-sm:text-xs">
        <User
          color="#4b5563"
          className="absolute top-4 left-0 w-4 h-4 sm:w-8 sm:h-8 "
        />
        <div className=" text-gray-400">
          <div>Name</div>
          {name ? (
            <span className="text-gray-600 font-semibold">{name}</span>
          ) : (
            <Minus />
          )}
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Pencil
              color="#4b5563"
              className="absolute top-5 right-0 w-4 h-4 sm:w-6 sm:h-6   cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent className=" max-w-[325px]">
            <DialogHeader>
              <DialogTitle>Edit name</DialogTitle>
              <DialogDescription>
                Make changes to your name here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <PersonalForm setIsOpen={setIsOpen} name={name} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
