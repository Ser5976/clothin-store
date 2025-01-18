'use client';
import { CollectionForm } from './collection-form';

export const CreateCollectionPage = () => {
  return (
    <main className=" flex flex-col gap-4">
      <h1 className=" text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        Create Collection
      </h1>
      <CollectionForm />
    </main>
  );
};
