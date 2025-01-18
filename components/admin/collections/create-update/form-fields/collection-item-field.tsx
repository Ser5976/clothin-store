import { Input } from '@/components/ui/input';
import { useColectionItemDelete } from '@/react-queries/admin/useCollectionItemDelete';
import { useProductQuery } from '@/react-queries/admin/useProductQuery';
import { ProductType } from '@/types/product_type';
import { Loader, Trash } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ProductOption } from './collection-field';

interface CollectionItemFildProps {
  selectedProducts: ProductOption[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductOption[]>>;
}

export const CollectionItemField = ({
  selectedProducts,
  setSelectedProducts,
}: CollectionItemFildProps) => {
  //поиск товаров для коллекции
  const [query, setQuery] = useState('');
  //обработка инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  // кастомный хук useQuery,делаем запрос на получение всех продуктов, или , если есть поиск,одного продукта
  const {
    data: productData,
    isLoading,
    isError,
    refetch,
  } = useProductQuery(query);
  //т.к. при  вводе данных в поисковую строку результаты будут загружаться в реальном времени,делаем задержку
  // чтобы было меньше запросов
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [query, refetch]);

  //добавление товара в коллекцию
  const addProductCollection = (product: ProductType) => {
    const selectedProduct = {
      productName: product.name,
      productId: product.id,
      imageUrl: product.image?.[0]?.url || '',
    };
    setSelectedProducts((prev) => [...prev, selectedProduct]);
  };
  //удаление товара из коллекции
  //кастомный хук useMutation, удаляет collectionItem
  const deleteProductItemBase = useColectionItemDelete();

  const deleteProductItem = (id: {
    collectionItemId: string | undefined;
    productId: string | undefined;
  }) => {
    if (id.collectionItemId) {
      deleteProductItemBase.mutateAsync(id.collectionItemId).then(() => {
        setSelectedProducts((prev) => [
          ...prev.filter((item) => item.productId !== id.productId),
        ]);
      });
    } else {
      setSelectedProducts((prev) => [
        ...prev.filter((item) => item.productId !== id.productId),
      ]);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-[10px]">
      <div className=" col-span-1 flex flex-col gap-2">
        <div className=" relative max-w-[250px]">
          <Input
            type="text"
            placeholder="Search for products..."
            className="w-full pt-[11px] px-[16px] pb-[12px] rounded-[4px] border border-[#D7DADD]
        max-[450px]:w-[200px] focus:outline-none"
            value={query}
            onChange={handlerInput}
          />

          <Image
            src="/header/search.svg"
            alt="search"
            width={16}
            height={16}
            className="absolute top-[12px] right-[16px]"
          />
        </div>
        {isError ? (
          <h1 className=" text-center font-semibold text-red-600 mt-2">
            Something went wrong!
          </h1>
        ) : isLoading ? (
          <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
            <Loader size={32} color="#17696a" />
          </div>
        ) : productData.products.length === 0 ? (
          <h1 className=" text-center font-semibold mt-2">
            The list of products is empty !
          </h1>
        ) : (
          <div className=" h-32 overflow-y-auto shadow-lg max-w-[250px] px-[16px] ">
            {productData.products.map((product) => {
              return (
                <div key={product.id}>
                  <div
                    className=" hover:text-gray-800 cursor-pointer"
                    onClick={() => addProductCollection(product)}
                  >
                    {product.name}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className=" col-span-2 mb-4 flex flex-wrap gap-4">
        {selectedProducts.map((product) => {
          return (
            <div
              key={product.productId}
              className="relative w-[150px] h-[150px] rounded-md overflow-hidden border p-4 "
            >
              <div className="z-10 absolute top-[4px] right-[4px]">
                <Trash
                  className="h-[12px] w-[12px] cursor-pointer"
                  color="red"
                  onClick={() =>
                    deleteProductItem({
                      collectionItemId: product.collectionItemId,
                      productId: product.productId,
                    })
                  }
                />
              </div>
              <div className=" relative w-[100px] h-[100px] rounded-md overflow-hidden">
                <Image
                  fill
                  className="object-cover"
                  alt="Image"
                  src={product.imageUrl}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
