import { SalesDataType } from './../types/sales_type';

export const getSales = async (): Promise<SalesDataType[] | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/get-sales`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return null;
  }
  const collection = res.json();
  return collection;
};
