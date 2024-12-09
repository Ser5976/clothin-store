import { getBrands } from '@/actions/get_brands';
import { getCategories } from '@/actions/get_categories';
import { getCollection } from '@/actions/get_collection';
import { getColors } from '@/actions/get_colors';
import { getMaterials } from '@/actions/get_materials';
import { getSizes } from '@/actions/get_size';
import { getTypes } from '@/actions/get_type';
import { BreadcrumbCollection } from '@/components/collection-page/breadcrumb-collection';
import { CollectionPage } from '@/components/collection-page/collection-page';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

const Collection = async ({
  searchParams,
}: {
  searchParams: {
    collectionId: string;
  };
}) => {
  // проверка , если нет collectionId
  if (!searchParams.collectionId)
    return (
      <div className=" text-center pt-32 text-red-500 text-xl">
        The collection is not selected
      </div>
    );
  const colectionPromise = getCollection(searchParams.collectionId);
  const typesPromise = getTypes();
  const sizesPromise = getSizes();
  const colorsPromise = getColors();
  const materialPromise = getMaterials();
  const categoriesPromise = getCategories();
  const brandsPromise = getBrands();
  // при помощи промиса делаем так, чтобы все запросы на этой странице были параллельными, а не последовательными
  // это улучшает скорость загрузки
  const [
    categories,
    generalBrands,
    sizes,
    colors,
    materials,
    collection,
    generalTypes,
  ] = await Promise.all([
    categoriesPromise,
    brandsPromise,
    sizesPromise,
    colorsPromise,
    materialPromise,
    colectionPromise,
    typesPromise,
  ]);

  return (
    <main className="min-h-screen">
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <Suspense>
            <BreadcrumbCollection collectionName={collection.name} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<CollectionBarFallback />}>
        <CollectionPage
          collectionName={collection.name}
          categories={categories}
          materials={materials}
          colors={colors}
          brands={generalBrands?.brands}
          sizes={sizes}
          types={generalTypes?.types}
        />
      </Suspense>
    </main>
  );
};
export default Collection;
function CollectionBarFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
