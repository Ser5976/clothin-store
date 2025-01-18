'use client';
import { useCollectionQuery } from '@/react-queries/admin/useCollectionQuery';
import { Loader } from 'lucide-react';
import React from 'react';
import { CollectionForm } from './collection-form';

export const UpdateCollectionPage = ({
  collectionId,
}: {
  collectionId: string;
}) => {
  // кастомный хук useQuery,делаем запрос на получение выбранной collection
  const {
    data: collection,
    isLoading,
    isError,
  } = useCollectionQuery(collectionId);
  return (
    <main className=" flex flex-col gap-4">
      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : (
        <div className="">
          <h1 className="   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
            Update Product
          </h1>
          <CollectionForm collection={collection} />
        </div>
      )}
    </main>
  );
};
