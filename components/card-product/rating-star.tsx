'use client';
import { RatingType } from '../../types/rating_type';
import StarRatings from 'react-star-ratings';
import { FC } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// RatingStar нужно импортировать  через динамический роут,чтобы избежать конфликта с сервером

type RatingStarProps = {
  rating: RatingType | null;
};

const RatingStar: FC<RatingStarProps> = ({ rating }): JSX.Element => {
  // кастомный хук- вычисляет размер звёздочки в зависимости от размера экрана пользователя,
  // короче ради адаптива,потому что не смог добраться до стилей css библиотеки react-star-ratings
  const { size } = useMediaQuery();
  // console.log('render rating:');
  return (
    <StarRatings
      rating={rating ? rating.value : 0}
      starRatedColor="gold"
      // starHoverColor="gold"
      starEmptyColor="#848482"
      numberOfStars={5}
      starDimension={size}
      starSpacing={'0'}
    />
  );
};

export default RatingStar;
