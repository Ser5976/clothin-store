'use client';
import { useSearchParams } from 'next/navigation';

const Search = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('value');
  console.log('Search render');
  return <div className="min-h-screen">Search query={search}</div>;
};

export default Search;
