'use client';
import { UserType } from '@/types/user_type';
import { Personal } from './personal/personal';

const PersonalData = ({ user }: { user: UserType | null }) => {
  return (
    <main className=" lg:grid lg:grid-cols-4  border-t-2 py-[3%]">
      <h1 className=" hidden lg:block text-zinc-800  font-black  leading-[130%] my-[3%] lg:text-[26px]">
        Personal data
      </h1>
      <ul className=" col-span-3">
        {!user ? (
          <h1 className=" text-center font-semibold text-red-600 mt-2">
            Что то пошло не так!
          </h1>
        ) : (
          <>
            <Personal name={user.name} userId={user.id} />
          </>
        )}
      </ul>
    </main>
  );
};

export default PersonalData;
