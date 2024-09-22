import { TypeReviews } from '@/types/type_reviews';
import { RatingType } from './rating_type';
import { ColorType } from './color_type';

import { BrandType } from './brand_type';
import { TypeType } from './type_type';
import { CategoryType } from '@/types/category_type';
import { MaterialType } from './material_type';
import { SizeType } from './size_type';

export type ProductType = {
  id: string;
  name: string;
  price: string;
  oldPrice: null | string;
  discount: null | string;
  description: string;
  isFeatured: boolean;
  isAvailability: boolean;
  isBestseller: boolean;
  typeId: string;
  brandId: string;
  categoryId: string;
  materialId: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryType;
  type: TypeType;
  brand: BrandType;
  material: MaterialType;
  rating: RatingType | null;
  image: [
    {
      id: string;
      url: string;
      fileKey: string;
      productId: string;
    }
  ];
  sizes: { size: SizeType }[];
  colors: { color: ColorType }[];
  review: TypeReviews[];
};
