import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Pencil, User } from 'lucide-react';
import { PersonalForm } from './personal-form';

export const Personal = ({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) => {
  //открытие модального окна для редактирование имени юзера
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="relative flex py-3 px-10 border-b">
        <User color="#4b5563" className="absolute top-4 left-0 w-8 h-8 " />
        <div className="w-1/3 text-gray-400 text-base">
          <div>Имя</div>
          {name ? (
            <span className="text-gray-600 font-semibold">{name}</span>
          ) : (
            <span>-</span>
          )}
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Pencil
              color="#4b5563"
              className="absolute top-5 right-0 w-6 h-6  fill-gray-600 cursor-pointer"
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
