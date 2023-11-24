import { FC } from 'react';

interface SalePageProps {
  params: {
    saleId: string;
  };
}

const Sale: FC<SalePageProps> = ({ params }) => {
  return <div>{params.saleId}</div>;
};

export default Sale;
