import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Mail, Pencil } from 'lucide-react';
import { EmailForm } from './email-form';

export const Email = ({ email }: { email: string }) => {
  //открытие модального окна для редактирование имени юзера
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="relative flex py-3 px-5 sm:px-10 text-xs sm:text-base border-b">
        <Mail
          color="#4b5563"
          className="absolute top-4 left-0 w-4 h-4 sm:w-8 sm:h-8 "
        />

        <div className=" text-gray-400">
          <div>Email</div>

          <span className="text-gray-600 font-semibold">{email}</span>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Pencil
              color="#4b5563"
              className="absolute top-5 right-0 w-4 h-4 sm:w-6 sm:h-6  fill-gray-600 cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent className=" max-w-[325px]">
            <DialogHeader>
              <DialogTitle>Edit email</DialogTitle>
              <DialogDescription>
                Make changes to your email here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <EmailForm setIsOpen={setIsOpen} email={email} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
