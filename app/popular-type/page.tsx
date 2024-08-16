import { getBrands } from '@/actions/get_brands';
import { getCategories } from '@/actions/get_categories';
import { getColors } from '@/actions/get_colors';
import { getMaterials } from '@/actions/get_materials';
import { getSizes } from '@/actions/get_size';
import { getTypes } from '@/actions/get_type';
import { CategoryPage } from '@/components/category-page/category-page';
import { BreadcrumbPopularType } from '@/components/popular-type-page/breadcrumb-popular-type';
import { PopularTypePage } from '@/components/popular-type-page/popular-type-page';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

const PopularType = async ({
  searchParams,
}: {
  searchParams: { [typeId: string]: string | string[] | undefined };
}) => {
  const typesPromise = getTypes();
  const sizesPromise = getSizes();
  const colorsPromise = getColors();
  const materialPromise = getMaterials();
  const categoriesPromise = getCategories();
  const brandsPromise = getBrands();
  // при помощи промиса делаем так, чтобы все запросы на этой странице были параллельными, а не последовательными
  // это улучшает скорость загрузки
  const [categories, brands, sizes, colors, materials, types] =
    await Promise.all([
      categoriesPromise,
      brandsPromise,
      sizesPromise,
      colorsPromise,
      materialPromise,
      typesPromise,
    ]);
  // определяем name type
  const nameType = types.find((type) => type.id === searchParams.typeId);
  return (
    <main className="min-h-screen">
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          {nameType ? <BreadcrumbPopularType name={nameType?.name} /> : null}
        </div>
      </div>
      <Suspense fallback={<PopularTypeBarFallback />}>
        <PopularTypePage
          typeName={nameType?.name}
          categories={categories}
          materials={materials}
          colors={colors}
          brands={brands}
          sizes={sizes}
        />
      </Suspense>
    </main>
  );
};

export default PopularType;
function PopularTypeBarFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
