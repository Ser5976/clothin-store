import { getBillboard } from '@/actions/get_billboard';
import { getBrands } from '@/actions/get_brands';
import { getCategories } from '@/actions/get_categories';
import { getColors } from '@/actions/get_colors';
import { getMaterials } from '@/actions/get_materials';
import { getSizes } from '@/actions/get_size';
import { getTypes } from '@/actions/get_type';
import { BreadcrumbSearch } from '@/components/search-page/breadcrumb-search';
import { SearchPage } from '@/components/search-page/search-page';
import { Suspense } from 'react';

const Search = async () => {
  const typesPromise = getTypes();
  const sizesPromise = getSizes();
  const colorsPromise = getColors();
  const materialPromise = getMaterials();
  const categoriesPromise = getCategories();
  const brandsPromise = getBrands();
  // при помощи промиса делаем так, чтобы все запросы на этой странице были параллельными, а не последовательными
  // это улучшает скорость загрузки
  const [categories, types, brands, sizes, colors, materials] =
    await Promise.all([
      categoriesPromise,
      typesPromise,
      brandsPromise,
      sizesPromise,
      colorsPromise,
      materialPromise,
    ]);

  return (
    <main className="min-h-screen">
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <BreadcrumbSearch />
        </div>
      </div>
      <Suspense fallback={<SearchBarFallback />}>
        <SearchPage
          categories={categories}
          materials={materials}
          colors={colors}
          types={types}
          brands={brands}
          sizes={sizes}
        />
      </Suspense>
    </main>
  );
};

export default Search;
function SearchBarFallback() {
  return <>placeholder</>;
}
