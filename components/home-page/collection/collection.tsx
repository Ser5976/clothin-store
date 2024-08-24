import { CustomButton } from '@/components/ui/custom-ui/custom-button/custom-button';
import { TypeCollection } from '@/types/type_collection';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import styles from './collection.module.css';

interface ICollectionProps {
  collections: TypeCollection[] | null;
}
//const ar = [] as [];
export const Collection: FC<ICollectionProps> = ({ collections }) => {
  return (
    <section className={styles.section}>
      {!collections ? (
        <div className=" text-red-500 text-center pb-2 md:text:lg lg:text-xl">
          The collections is not loaded, something went wrong!
        </div>
      ) : collections.length === 0 ? (
        <div className=" text-red-500 text-center pb-2 md:text:lg lg:text-xl">
          The collections is empty, add products!
        </div>
      ) : null}
      <div className={styles.row}>
        {!collections || collections.length === 0
          ? Array.from({ length: 4 }).map((_, index) => {
              return (
                <div
                  key={index}
                  className={` bg-slate-200 w-full max-w-[1200px] h-[150px] md:h-[200px] lg:h-[250px]  ${
                    index === 1 || index === 2 ? ' col-span-3' : 'col-span-2'
                  }`}
                ></div>
              );
            })
          : collections.map((collection, index) => {
              return (
                <div
                  key={collection.id}
                  className={` relative ${
                    index === 1 || index === 2 ? ' col-span-3' : 'col-span-2'
                  }`}
                >
                  <div className={styles.content}>
                    <div className={styles.name}>{collection.name}</div>
                    <div className={styles.description}>
                      {collection.description}
                    </div>
                    <Link href={`./collection?collectionId=${collection.id}`}>
                      <CustomButton small={true} size="sm">
                        Shop the collection
                      </CustomButton>
                    </Link>
                  </div>
                  <Image
                    src={collection.image.url}
                    width={735}
                    height={500}
                    alt="Picture of the author"
                    priority
                  />
                </div>
              );
            })}
      </div>
    </section>
  );
};
