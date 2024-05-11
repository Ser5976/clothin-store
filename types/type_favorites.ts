export type TypeFavourites = {
  product: {
    image: {
      id: string;
      url: string;
      fileKey: string;
      productId: string;
    }[];
    name: string;
    price: number;
    oldPrice: number | null;
  };
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};
