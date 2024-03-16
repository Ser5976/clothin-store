import { FC } from 'react';

interface TypePageProps {
  params: {
    typeId: string;
  };
}

const Type: FC<TypePageProps> = ({ params }) => {
  return <div>{params.typeId}</div>;
};

export default Type;
