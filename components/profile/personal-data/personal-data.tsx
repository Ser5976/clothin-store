'use client';
import { UserType } from '@/types/user_type';
import { Address } from './address/address';
import { Email } from './email/email';
import { Password } from './password/password';
import { Personal } from './personal/personal';
import { Phone } from './phone/phone';

const PersonalData = ({ user }: { user: UserType | null }) => {
  // console.log('adress:', user?.address);
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
