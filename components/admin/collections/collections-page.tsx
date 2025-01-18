'use client';
import { Button } from '@/components/ui/button';
import { useCollectionsQuery } from '@/react-queries/admin/useCollectionsQuery';
import { Loader, RotateCw } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { CollectionItem } from './collection-item';

export const CollectionsPage = () => {
  // кастомный хук useQuery,делаем запрос на получение всех collection
  const { data: collectionList, isLoading, isError } = useCollectionsQuery();
  //console.log('collectionList:', collectionList);
  return (
    <main className=" flex flex-col gap-5">
      <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Collections</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            collectionList?.length
          )}
        </span>
      </h1>
      <div className=" flex justify-end">
        <Link href="/admin/collections/create-collection">
          <Button className=" text-[16px] h-[40px] bg-cyan-800 w-[180px] hover:bg-cyan-900 max-md:w-[150px] max-md:text-[14px] ">
            Add a collection
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
      ) : collectionList.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of types is empty !
        </h1>
      ) : (
        <div>
          {collectionList.map((collection) => {
            return (
              <div key={collection.id}>
                <CollectionItem collection={collection} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
