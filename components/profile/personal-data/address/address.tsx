import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Pencil, MapPin, Minus } from 'lucide-react';
import { Address as AddressType } from '@prisma/client';
import { AddressForm } from './address-form';

export const Address = ({ address }: { address: AddressType | null }) => {
  //открытие модального окна для редактирование имени юзера
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="relative grid grid-cols-4  py-3 px-5 sm:px-10 border-b text-gray-600 font-semibold text-xs  sm:text-base gap-4">
        <MapPin
          color="#4b5563"
          className="absolute top-4 left-0 w-4 h-4 sm:w-8 sm:h-8 "
        />
        <div>
          <div className=" text-gray-400 font-normal">Country</div>
          {address ? (
            address.country ? (
              <span>{address.country}</span>
            ) : (
              <Minus />
            )
          ) : (
            <Minus />
          )}
        </div>
        <div>
          <div className=" text-gray-400 font-normal">City</div>
          {address ? (
            <span className="break-words max-w-xs">{address.city}</span>
          ) : (
            <Minus />
          )}
        </div>
        <div>
          <div className=" text-gray-400 font-normal">Street</div>
          {address ? (
            <span className="break-words max-w-xs">{address.street}</span>
          ) : (
            <Minus />
          )}
        </div>
        <div>
          <div className=" text-gray-400 font-normal">House/flat</div>
          {address ? (
            <>
              <span>{address.house}</span>
              <span>{address.flat && <>/{address.flat}</>}</span>
            </>
          ) : (
            <Minus />
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
              <DialogTitle>Edit address</DialogTitle>
              <DialogDescription>
                Make changes to your address here. Click save when you're done.
              </DialogDescription>
              <AddressForm address={address} setIsOpen={setIsOpen} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
