import { FC } from 'react';

interface CustomersPageProps {
  params: {
    customersId: string;
  };
}

const Customers: FC<CustomersPageProps> = ({ params }) => {
  return <div>{params.customersId}</div>;
};

export default Customers;
