import { CustomersType } from './../types/customers_type';

export const getCustomer = async (id: string): Promise<CustomersType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/for-customers/${id}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const customer = res.json();
  return customer;
};
