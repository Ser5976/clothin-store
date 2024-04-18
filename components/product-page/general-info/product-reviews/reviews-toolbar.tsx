import { Button } from '@/components/ui/button';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Select } from '@radix-ui/react-select';
import React from 'react';
import { Dispatch, FC, memo, SetStateAction } from 'react';

type SortType = {
  newest: boolean;
  rating: boolean;
  reset: boolean;
  page: number;
};

type ReviewsToolbarProps = {
  setSort: Dispatch<SetStateAction<SortType>>;
};
const ReviewsToolbar: FC<ReviewsToolbarProps> = ({ setSort }) => {
  console.log('Render:ReviewsToolbar');
  // при помощи switch case изменяем объект для сортировки
  const getSorting = (value: string) => {
    switch (value) {
      case 'rating':
        setSort((prev) => {
          return { ...prev, rating: true, newest: false, reset: false };
        });
        break;
      case 'reset':
        setSort((prev) => {
          return { ...prev, reset: true, newest: false, rating: false };
        });
        break;
      case 'newest':
        setSort((prev) => {
          return { ...prev, rating: false, newest: true, reset: false };
        });
        break;
      default:
        setSort((prev) => prev);
        break;
    }
  };
  return (
    <div className=" flex justify-between mb-[60px] max-md:mb-[40px]">
      <Button
        size="sm"
        className=" text-[14px] h-11 bg-cyan-800 w-[180px] hover:bg-cyan-900 max-md:w-[150px] "
      >
        Leave a review
      </Button>

      <Select onValueChange={getSorting}>
        <SelectGroup>
          <SelectTrigger className=" w-[130px] h-11 max-md:w-[110px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="rating"> high rating</SelectItem>
            <SelectItem value="newest">newest</SelectItem>
            <SelectItem value="reset"> reset</SelectItem>
          </SelectContent>
        </SelectGroup>
      </Select>
    </div>
  );
};
export default memo(ReviewsToolbar);
