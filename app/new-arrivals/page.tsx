import { getBrands } from '@/actions/get_brands';
import { getCategories } from '@/actions/get_categories';
import { getColors } from '@/actions/get_colors';
import { getMaterials } from '@/actions/get_materials';
import { getSizes } from '@/actions/get_size';
import { getTypes } from '@/actions/get_type';
import { BreadcrumbNewArrivals } from '@/components/new-arrivals-page/breadcrumb-new-arrivals';
import { NewArrivalsPage } from '@/components/new-arrivals-page/new-arrivals-page';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

const NewArrivals = async () => {
  const typesPromise = getTypes();
  const sizesPromise = getSizes();
  const colorsPromise = getColors();
  const materialPromise = getMaterials();
  const categoriesPromise = getCategories();
  const brandsPromise = getBrands();
  // при помощи промиса делаем так, чтобы все запросы на этой странице были параллельными, а не последовательными
  // это улучшает скорость загрузки
  const [generalTypes, categories, brands, sizes, colors, materials] =
    await Promise.all([
      typesPromise,
      categoriesPromise,
      brandsPromise,
      sizesPromise,
      colorsPromise,
      materialPromise,
    ]);

  return (
    <main className="min-h-screen">
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <BreadcrumbNewArrivals />
        </div>
      </div>
      <Suspense fallback={<NewArrivalsBarFallback />}>
        <NewArrivalsPage
          categories={categories}
          materials={materials}
          colors={colors}
          brands={brands}
          sizes={sizes}
          types={generalTypes?.types}
        />
      </Suspense>
    </main>
  );
};

export default NewArrivals;
function NewArrivalsBarFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
