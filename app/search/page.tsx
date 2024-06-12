'use client';
import { useSearchParams } from 'next/navigation';

const Search = () => {
  const searchParams = useSearchParams();
  const typeId = searchParams.get('typeId');
  const brandId = searchParams.get('brandId');
  const materialId = searchParams.get('materialId');
  const search = typeId
    ? typeId
    : brandId
    ? brandId
    : materialId
    ? materialId
    : '';
  console.log('Search render');
  return <div className="min-h-screen">Search query={search}</div>;
};

export default Search;
