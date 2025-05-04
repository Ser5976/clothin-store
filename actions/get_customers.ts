import { CustomersType } from '@/types/customers_type';

export const getCustomers = async (): Promise<CustomersType[] | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/for-customers`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return null;
  }
  const customers = res.json();
  return customers;
};
