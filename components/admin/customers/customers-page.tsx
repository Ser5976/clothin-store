'use client';
import { Button } from '@/components/ui/button';
import { useCustomersQuery } from '@/react-queries/admin/useCustomersQuery';

import { Loader, RotateCw } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { CustomerItem } from './customers-item';

export const CustomersPage = () => {
  // кастомный хук useQuery,делаем запрос на получение всех страниц
  const { data: customersList, isLoading, isError } = useCustomersQuery();

  return (
    <main className=" flex flex-col gap-5">
      <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Pages for customers</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            customersList?.length
          )}
        </span>
      </h1>
      <div className=" flex justify-end">
        <Link href="/admin/customers/create-customer">
          <Button className=" text-[16px] h-[40px] bg-cyan-800 w-[180px] hover:bg-cyan-900 max-md:w-[150px] max-md:text-[14px] ">
            Add
          </Button>
        </Link>
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : customersList.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of types is empty !
        </h1>
      ) : (
        <div>
          {customersList.map((customer) => {
            return (
              <div key={customer.id}>
                <CustomerItem customer={customer} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
