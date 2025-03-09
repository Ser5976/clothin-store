'use client';

import { useRequisitesQuery } from '@/react-queries/admin/useRequisitesQuery';
import { Loader } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import { ModalCreateRequisites } from './modal-requisites/modal-create-requisites';
import { RequisitesItem } from './requisites-item';

export const RequisitesPage = () => {
  // стейт для импута
  const [query, setQuery] = useState('');
  //обработка инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  // кастомный хук useQuery,делаем запрос на получение requisitez
  const { data: requisites, isLoading, isError } = useRequisitesQuery();

  return (
    <main className=" flex flex-col gap-5">
      <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Requisites</span>
        <span className="text-lg lg:text-xl"></span>
      </h1>
      <ModalCreateRequisites />

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : requisites.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of brands is empty !
        </h1>
      ) : (
        <div>
          {requisites.map((requisites) => {
            return (
              <div key={requisites.id}>
                <RequisitesItem requisites={requisites} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
