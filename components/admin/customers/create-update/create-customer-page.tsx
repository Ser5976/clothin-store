'use client';

import { CustomerForm } from './castomer-form';

export const CreateCustomerPage = () => {
  return (
    <main className=" flex flex-col gap-4">
      <h1 className=" text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        Create a page for customer
      </h1>
      <CustomerForm />
    </main>
  );
};
