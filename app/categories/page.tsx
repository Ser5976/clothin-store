import { getBrands } from '@/actions/get_brands';
import { getCategories } from '@/actions/get_categories';
import { getColors } from '@/actions/get_colors';
import { getMaterials } from '@/actions/get_materials';
import { getSizes } from '@/actions/get_size';
import { BreadcrumbCategory } from '@/components/category-page/breadcrumb-category';
import { CategoryPage } from '@/components/category-page/category-page';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

const Category = async () => {
  const sizesPromise = getSizes();
  const colorsPromise = getColors();
  const materialPromise = getMaterials();
  const categoriesPromise = getCategories();
  const brandsPromise = getBrands();
  // при помощи промиса делаем так, чтобы все запросы на этой странице были параллельными, а не последовательными
  // это улучшает скорость загрузки
  const [categories, generalBrands, sizes, colors, materials] =
    await Promise.all([
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
          <BreadcrumbCategory />
        </div>
      </div>
      <Suspense fallback={<CategoriesBarFallback />}>
        <CategoryPage
          categories={categories}
          materials={materials}
          colors={colors}
          brands={generalBrands?.brands}
          sizes={sizes}
        />
      </Suspense>
    </main>
  );
};

export default Category;
function CategoriesBarFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
