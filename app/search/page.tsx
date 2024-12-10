import { getBrands } from '@/actions/get_brands';
import { getCategories } from '@/actions/get_categories';
import { getColors } from '@/actions/get_colors';
import { getMaterials } from '@/actions/get_materials';
import { getSizes } from '@/actions/get_size';
import { getTypes } from '@/actions/get_type';
import { BreadcrumbSearch } from '@/components/search-page/breadcrumb-search';
import { SearchPage } from '@/components/search-page/search-page';
import { Loader } from 'lucide-react';
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
  const [
    categories,
    generalType,
    generalBrand,
    sizes,
    colors,
    generalMaterial,
  ] = await Promise.all([
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
          materials={generalMaterial?.materials}
          colors={colors}
          types={generalType?.types}
          brands={generalBrand?.brands}
          sizes={sizes}
        />
      </Suspense>
    </main>
  );
};

export default Search;
function SearchBarFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
