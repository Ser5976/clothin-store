import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteImg } from '@/utils/utapi-delete';
import { useState } from 'react';
import { BillboardForm } from './billboard-form';

export const ModalCreateBillboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  // есть ещё один сценарий,когда пользователь выбирает картинку,
  //но потом закрывает модальное окно(соответственно картинка остаётся в aploadthing )
  // это кастыль для удаление картинки при таком сценарии
  //стейт для выбранной(но не сохранённой) картинки
  const [selectedImg, setSelectedImg] = useState<string | undefined>(undefined);
  const handleModalClose = async (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (selectedImg) {
      // получаем fileKey
      const fileKey = selectedImg?.substring(selectedImg.lastIndexOf('/') + 1);
      await deleteImg(fileKey);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
        handleModalClose(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button className=" text-[16px] h-[35px] bg-cyan-800  hover:bg-cyan-900  max-md:text-[14px] ">
          Add a billboard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add billboard</DialogTitle>
          <DialogDescription>
            You can create no more than 4 billboards
          </DialogDescription>
        </DialogHeader>
        <BillboardForm setIsOpen={setIsOpen} setSelectedImg={setSelectedImg} />
      </DialogContent>
    </Dialog>
  );
};
