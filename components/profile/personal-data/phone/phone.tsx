import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Pencil, PhoneOutgoing } from 'lucide-react';
import { PhoneForm } from './phone-form';

export const Phone = ({ phone }: { phone: string }) => {
  //открытие модального окна для редактирование имени юзера
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="relative flex py-3 px-5 border-b sm:px-10 text-xs sm:text-base">
        <PhoneOutgoing
          color="#4b5563"
          className="absolute top-4 left-0 w-4 h-4 sm:w-8 sm:h-8 "
        />

        <div className=" text-gray-400">
          <div>Phone</div>
          {phone ? (
            <span className="text-gray-600 font-semibold">{phone}</span>
          ) : (
            <span>-</span>
          )}
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
              <DialogTitle>Edit phone</DialogTitle>
              <DialogDescription>
                Make changes to your phone here. Click save when you're done.
              </DialogDescription>
              <PhoneForm phone={phone} setIsOpen={setIsOpen} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
