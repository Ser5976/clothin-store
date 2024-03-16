import { buttonVariants } from '@/components/ui/button';
import { CustomButton } from '@/components/ui/custom-ui/custom-button/custom-button';
import { cn } from '@/lib/utils';
import { TypeCollection } from '@/types/type_collection';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import styles from './collection.module.css';

interface ICollectionProps {
  collections: TypeCollection[];
}

export const Collection: FC<ICollectionProps> = ({ collections }) => {
  return (
    <section className={styles.section}>
      <div className={styles.row}>
        {collections.map((collection, index) => {
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
                <Link href={`./collection/${collection.id}`}>
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
