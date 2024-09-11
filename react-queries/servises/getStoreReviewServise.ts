import { CommenTypeStoreReview } from '@/types/stor_review_type';
import axios from 'axios';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const getStoreReviewServise = async (
  searchPrams: ReadonlyURLSearchParams
) => {
  const { data } = await axios.get<CommenTypeStoreReview>(
    `/api/store-review?${searchPrams}`
  );
  return data;
};
