import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { KeyRound, Pencil } from 'lucide-react';
import { PasswordForm } from './password-form';

export const Password = () => {
  //открытие модального окна для редактирование имени юзера
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="relative flex py-3 px-5 border-b sm:px-10 text-base max-sm:text-xs">
        <KeyRound
          color="#4b5563"
          className="absolute top-4 left-0 w-4 h-4 sm:w-8 sm:h-8 "
        />
        <div className=" text-gray-400 ">
          <div>Password</div>

          <span className="text-gray-600 font-semibold text-xl sm:text-3xl">
            ..........
          </span>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Pencil
              color="#4b5563"
              className="absolute top-5 right-0 w-4 h-4 sm:w-6 sm:h-6  cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent className=" max-w-[325px]">
            <DialogHeader>
              <DialogTitle>Edit password</DialogTitle>
              <DialogDescription>
                Make changes to your password here. Click save when you're done.
              </DialogDescription>
              <PasswordForm setIsOpen={setIsOpen} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
