import { ProductType } from './product_type';
export type TypeCollection = {
  id: string;
  name: string;
  description: string;
  image: { id: string; url: string; fileKey: string };
  collectionItem: {
    id: string;
    productCollectionId: string;
    productId: string;
    product: ProductType;
  }[];
};
