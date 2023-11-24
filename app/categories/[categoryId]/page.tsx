import { FC } from 'react';

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

const Category: FC<CategoryPageProps> = ({ params }) => {
  return <div>{params.categoryId}</div>;
};

export default Category;
