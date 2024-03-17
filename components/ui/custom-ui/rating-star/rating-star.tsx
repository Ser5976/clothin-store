'use client';
import StarRatings from 'react-star-ratings';
import { FC, HTMLAttributes } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import { RatingType } from '@/types/rating_type';
import { starSize } from './star-size';

// RatingStar нужно импортировать  через динамический роут,чтобы избежать конфликта с сервером

type RatingStarProps = {
  rating: RatingType | null;
  size: 'small' | 'big';
  estimation?: boolean;
  className?: HTMLAttributes<HTMLDivElement> | string;
};

const RatingStar: FC<RatingStarProps> = ({
  rating,
  size,
  estimation = false,
  className,
}): JSX.Element => {
  // кастомный хук- вычисляет размер звёздочки в зависимости от размера экрана пользователя,
  // короче ради адаптива,потому что не смог добраться до стилей css библиотеки react-star-ratings
  const { screenWidth } = useMediaQuery();
  // console.log('render rating:');
  return (
    <div className={`flex-col ${className}`}>
      <StarRatings
        rating={rating ? rating.value : 0}
        starRatedColor="gold"
        // starHoverColor="gold"
        starEmptyColor="#848482"
        numberOfStars={5}
        starDimension={
          size === 'small'
            ? starSize.small(screenWidth)
            : starSize.big(screenWidth)
        }
        starSpacing={'0'}
      />
      {estimation ? (
        rating?.count ? (
          <div className=" text-zinc-500 text-[14px] font-normal  leading-[150%]">
            Estimation: {rating.count}{' '}
          </div>
        ) : (
          <div className="text-zinc-500 text-[14px] font-normal  leading-[150%]">
            Estimation: 0
          </div>
        )
      ) : null}
    </div>
  );
};

export default RatingStar;
