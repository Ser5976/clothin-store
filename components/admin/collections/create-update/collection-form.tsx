import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TypeCollection } from '@/types/type_collection';
import {
  CollectionDataType,
  CollectionValidator,
} from '@/validators/collection-validator';
import { useCollectionPost } from '@/react-queries/admin/useCollectionPost';
import { useCollectionUpdate } from '@/react-queries/admin/useCollectionUpdate';
import { NameField } from './form-fields/name-field';
import { DescriptionField } from './form-fields/description-field';
import { CollectionField } from './form-fields/collection-field';
import { ImageField } from './form-fields/image-field';
import { deleteImg } from '@/utils/utapi-delete';

export const CollectionForm = ({
  collection,
}: {
  collection?: TypeCollection;
}) => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CollectionDataType>({
    resolver: zodResolver(CollectionValidator),
    defaultValues: {
      name: collection ? collection.name : '',
      description: collection ? collection.description : '',
      image: collection ? collection.image : {},
      collectionItem: collection ? collection.collectionItem : [],
    },
  });

  const createCollection = useCollectionPost();
  const updateCollection = useCollectionUpdate();

  const onSubmit = async (data: CollectionDataType) => {
    console.log('collection:', data);
    if (collection) {
      const dataCollection = { id: collection.id, collection: data };
      updateCollection.mutate(dataCollection);
      if (collection.image.fileKey !== data.image.fileKey) {
        await deleteImg(collection.image.fileKey); // удаляем дефолтную  картинку из uploadthign
      }

      route.push('/admin/collections');
    } else {
      createCollection.mutate(data);
      route.push('/admin/collections');
    }
  };

  return (
    <Form {...form}>
      <FormProvider {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-4  "
        >
          <div className=" flex flex-col gap-4">
            <NameField />
            <DescriptionField />
            <ImageField collection={collection} />
          </div>
          <div className=" border p-4 rounded-md">
            <CollectionField collectionItem={collection?.collectionItem} />
          </div>

          <div className=" flex justify-end">
            <Button
              disabled={isLoading}
              type="submit"
              className=" w-[25%] h-10 bg-cyan-800 hover:bg-cyan-900 mt-[12px] "
            >
              {isLoading ? (
                <RotateCw
                  size={20}
                  color="#ffffff"
                  strokeWidth={1.5}
                  absoluteStrokeWidth
                  className="mr-4  animate-spin"
                />
              ) : null}
              Save collection
            </Button>
          </div>
        </form>
      </FormProvider>
    </Form>
  );
};
