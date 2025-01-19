import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PopularTypesType } from '@/types/popular_types_type';
import { deleteImg } from '@/utils/utapi-delete';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { PopularTypeForm } from './popular-type-form';

export const ModalUpdatePopularType = ({
  popularType,
}: {
  popularType: PopularTypesType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // есть ещё один сценарий,когда пользователь выбирает картинку,
  //но потом закрывает модальное окно(соответственно картинка остаётся в aploadthing )
  // это кастыль для удаление картинки при таком сценарии
  //стейт для выбранной(но не сохранённой) картинки
  const [selectedImg, setSelectedImg] = useState<string | undefined>(undefined);
  const handleModalClose = async (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (selectedImg && popularType.image.url !== selectedImg) {
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
        <Pencil size={18} className=" hover:text-gray-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Updating the popular type</DialogTitle>
        </DialogHeader>
        <PopularTypeForm
          setIsOpen={setIsOpen}
          popularType={popularType}
          setSelectedImg={setSelectedImg}
        />
      </DialogContent>
    </Dialog>
  );
};
