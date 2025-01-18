import React from 'react';
import { Pencil, RotateCw, X } from 'lucide-react';

import { TypeCollection } from '@/types/type_collection';
import { useCollectionDelete } from '@/react-queries/admin/useCollectionDelete';
import Link from 'next/link';

export const CollectionItem = ({
  collection,
}: {
  collection: TypeCollection;
}) => {
  //кастомный хук useMutation, удаляет коллекцию
  const mutationDeleteCollection = useCollectionDelete();
  // удаление коллекции
  const collectionDelete = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete collection ${collection.name}`
    );
    if (userConfirmed) {
      mutationDeleteCollection.mutate(collection.id);
    }
  };
  return (
    <div className=" flex items-center justify-between border-t border-gray-400  text-gray-400 h-10 ">
      <div>{collection.name}</div>

      <div className=" flex gap-3">
        <Link href={`/admin/collections/update-collection/${collection.id}`}>
          <Pencil size={18} className=" hover:text-gray-800 " />
        </Link>
        <div className="">
          {mutationDeleteCollection.isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            <X
              size={20}
              className=" hover:text-gray-800 cursor-pointer"
              onClick={collectionDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
