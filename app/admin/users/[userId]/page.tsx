import { getUser } from '@/actions/get_user';
import {
  Mail,
  MapPin,
  Minus,
  PhoneOutgoing,
  User,
  UserCircle2,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const user = await getUser(params.userId);
  return (
    <>
      {!user ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : (
        <div className=" flex flex-col">
          {/* Avatar */}
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
          {/* Personal */}

          <div className="relative flex py-3 px-5 border-b sm:px-10 text-base max-sm:text-xs">
            <User
              color="#4b5563"
              className="absolute top-4 left-0 w-4 h-4 sm:w-8 sm:h-8 "
            />
            <div className=" text-gray-400">
              <div>Name</div>
              {user.name ? (
                <span className="text-gray-600 font-semibold">{user.name}</span>
              ) : (
                <Minus />
              )}
            </div>
          </div>

          {/*Email */}
          <div className="relative flex py-3 px-5 sm:px-10 text-base max-sm:text-xs border-b">
            <Mail
              color="#4b5563"
              className="absolute top-4 left-0 w-4 h-4 sm:w-8 sm:h-8 "
            />

            <div className=" text-gray-400">
              <div>Email</div>

              <span className="text-gray-600 font-semibold">{user.email}</span>
            </div>
          </div>

          {/*Phone */}
          <div className="relative flex py-3 px-5 border-b text-gray-600 font-semibold sm:px-10  text-base max-sm:text-xs">
            <PhoneOutgoing
              color="#4b5563"
              className="absolute top-4 left-0 w-4 h-4 sm:w-8 sm:h-8 "
            />

            <div>
              <div className=" text-gray-400">Phone</div>
              {user.phone ? <span>{user.phone}</span> : <Minus />}
            </div>
          </div>
          {/*Address */}
          <div className="relative grid grid-cols-4  py-3 px-5 sm:px-10 border-b text-gray-600 font-semibold text-base max-sm:text-xs gap-4">
            <MapPin
              color="#4b5563"
              className="absolute top-4 left-0 w-4 h-4 sm:w-8 sm:h-8 "
            />
            <div>
              <div className=" text-gray-400 font-normal">Country</div>
              {user.address ? (
                user.address.country ? (
                  <span>{user.address.country}</span>
                ) : (
                  <Minus />
                )
              ) : (
                <Minus />
              )}
            </div>
            <div>
              <div className=" text-gray-400 font-normal">City</div>
              {user.address ? (
                <span className="break-words max-w-xs">
                  {user.address.city}
                </span>
              ) : (
                <Minus />
              )}
            </div>
            <div>
              <div className=" text-gray-400 font-normal">Street</div>
              {user.address ? (
                <span className="break-words max-w-xs">
                  {user.address.street}
                </span>
              ) : (
                <Minus />
              )}
            </div>
            <div>
              <div className=" text-gray-400 font-normal">House/flat</div>
              {user.address ? (
                <>
                  <span>{user.address.house}</span>
                  <span>{user.address.flat && <>/{user.address.flat}</>}</span>
                </>
              ) : (
                <Minus />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserPage;
