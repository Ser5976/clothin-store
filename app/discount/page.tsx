import { getBrands } from '@/actions/get_brands';
import { getCategories } from '@/actions/get_categories';
import { getColors } from '@/actions/get_colors';
import { getMaterials } from '@/actions/get_materials';
import { getSizes } from '@/actions/get_size';
import { getTypes } from '@/actions/get_type';
import { BreadcrumbDiscount } from '@/components/discount-page/breadcrumb-discount';
import { DiscountPage } from '@/components/discount-page/discount-page';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

const Discount = async () => {
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

  return (
    <main className="min-h-screen">
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <BreadcrumbDiscount />
        </div>
      </div>
      <Suspense fallback={<CategoriesBarFallback />}>
        <DiscountPage
          categories={categories}
          materials={materials}
          colors={colors}
          brands={brands}
          sizes={sizes}
          types={types}
        />
      </Suspense>
    </main>
  );
};

export default Discount;
function CategoriesBarFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
