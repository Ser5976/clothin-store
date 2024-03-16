import { FC } from 'react';

interface CollectionPageProps {
  params: {
    collectionId: string;
  };
}

const Collection: FC<CollectionPageProps> = ({ params }) => {
  return <div>{params.collectionId}</div>;
};

export default Collection;
