'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteAvatarAction } from '@/server-action/user/delete-avatar-action';
import { UserType } from '@/types/user_type';
import { deleteImg } from '@/utils/utapi-delete';
import { Pencil, UserCircle2, X, RotateCw } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Address } from './address/address';
import { AvatarForm } from './avatar/avatar-form';
import { Email } from './email/email';
import { Password } from './password/password';
import { Personal } from './personal/personal';
import { Phone } from './phone/phone';

const PersonalData = ({ user }: { user: UserType | null }) => {
  // console.log('adress:', user?.address);
  // для спинера
  const [isLoading, setIsLoading] = useState(false);
  //открытие модального окна для редактирование
  const [isOpen, setIsOpen] = useState(false);
  //стейт для выбранной(но не сохранённой) картинки
  const [selectedImg, setSelectedImg] = useState(user?.image);

  // есть ещё один сценарий,когда пользователь выбирает картинку,
  //но потом закрывает модальное окно(соответственно картинка остаётся в aploadthing )
  // это кастыль для удаление картинки при таком сценарии
  const handleModalClose = (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (user?.image && user.image !== selectedImg) {
      // получаем fileKey
      const fileKey = selectedImg?.substring(selectedImg.lastIndexOf('/') + 1);
      if (fileKey) {
        const deleteAvatar = async () => await deleteImg(fileKey);
        deleteAvatar();
      }
    }
  };
  // удаление картинки
  const deleteAvatar = () => {
    setIsLoading(true);
    deleteAvatarAction({ currentAvatar: user?.image })
      .then(() => {
        setIsLoading(false);
        toast.success('Youre phone has been changed');
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Something went wrong');
      });
  };
  return (
    <main className=" grid grid-cols-1 lg:grid-cols-4  border-t-2 py-[3%] gap-8">
      <div className=" lg:col-span-1  flex flex-col  gap-4">
        <h1 className="  text-zinc-800  font-black  leading-[130%] mt-[3%] text-xl lg:text-2xl">
          Personal data
        </h1>
        <div className=" relative border  py-6 flex flex-col gap-4 ">
          <div>
            {user?.image ? (
              <div className=" flex w-full justify-center">
                <Image
                  src={user.image}
                  className="w-[150px] h-[150px]  rounded-full"
                  alt="картинка"
                  width={100}
                  height={100}
                />
              </div>
            ) : (
              <div className=" flex w-full justify-center">
                <UserCircle2 size={150} color=" black" strokeWidth={1} />
              </div>
            )}
          </div>

          <div className=" flex w-full justify-center gap-[15%]">
            <Dialog
              open={isOpen}
              onOpenChange={(isOpen) => {
                setIsOpen(isOpen);
                handleModalClose(isOpen);
              }}
            >
              <DialogTrigger asChild>
                <Pencil
                  color="#4b5563"
                  className="absolute top-2 left-2 w-4 h-4   cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent className=" max-w-[325px]">
                <DialogHeader>
                  <DialogTitle>Edit avatar</DialogTitle>
                  <DialogDescription>
                    Make changes to your avatr here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <AvatarForm
                  avatar={user?.image}
                  handleModalClose={handleModalClose}
                  setSelectedImg={setSelectedImg}
                  setIsOpen={setIsOpen}
                />
              </DialogContent>
            </Dialog>
            {user?.image ? (
              isLoading ? (
                <RotateCw
                  color="#4b5563"
                  className=" absolute top-2 right-2 w-4 h-4 animate-spin"
                />
              ) : (
                <X
                  color="#4b5563"
                  className="absolute top-2 right-2 w-4 h-4   cursor-pointer"
                  onClick={deleteAvatar}
                />
              )
            ) : null}
          </div>
        </div>
      </div>

      <ul className=" lg:col-span-3">
        {!user ? (
          <h1 className=" text-center font-semibold text-red-600 mt-2">
            Something went wrong!
          </h1>
        ) : (
          <>
            <Personal name={user.name} />
            <Email email={user.email} />
            <Password />
            <Phone phone={user.phone} />
            <Address address={user.address} />
          </>
        )}
      </ul>
    </main>
  );
};

export default PersonalData;
