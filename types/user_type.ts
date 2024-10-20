import { OrderType } from './order_type';
import { StoreReviewType } from './stor_review_type';
import { Address } from '@prisma/client';
import { CartType } from './cart_type';
import { TypeFavourites } from './type_favorites';
import { TypeReviews } from './type_reviews';

export type UserType = {
  catr: CartType;
  email: string;
  phone: string;
  favorites: TypeFavourites[];
  id: string;
  image: string;
  name: string;
  role: string;
  address: Address;
  review: TypeReviews[];
  storeReviews: StoreReviewType[];
  order: OrderType[];
};
