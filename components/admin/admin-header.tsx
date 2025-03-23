import React from 'react';
import { NavigationMobile } from './navigation-mobile';

export const AdminHeader = () => {
  return (
    <div className="  pt-[2%]  grid grid-cols-3 gap-5 min-[900px]:grid-cols-4">
      <div className="  pl-9  py-1 col-span-1">
        <div className="min-[900px]:hidden">
          <NavigationMobile />
        </div>
        <h1 className=" hidden min-[900px]:block text-lg ">The admin menu</h1>
      </div>
      <h1 className="col-span-2 min-[900px]:col-span-3 text-zinc-800 font-semibold  leading-[130%]  text-2xl lg:text-4xl text-center">
        The admin panel
      </h1>
    </div>
  );
};
