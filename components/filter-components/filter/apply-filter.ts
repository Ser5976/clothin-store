import { Dispatch, SetStateAction } from 'react';
import { FilterStateType } from './filter';

type ApplyGenderFilterType = {
  category: keyof FilterStateType;
  value: string;
  filter: FilterStateType;
  setFilter: Dispatch<SetStateAction<FilterStateType>>;
};
//изменение фильтра стейта
export const changingFilter = ({
  category,
  value,
  filter,
  setFilter,
}: ApplyGenderFilterType): void => {
  //ну а теперь условия
  // если у нас выпадает gender,то если значение есть удаляем,если нет добавляем, если не gender, то делаем дальнейшее условие
  if (category === 'gender') {
    setFilter((prev) => ({
      ...prev,
      gender: value === filter.gender ? null : value,
    }));
  } else {
    //делаем проверку на существование значение в массивах
    const isFilterApplied = filter[category].includes(value as never);
    //если значение есть,то удаляем его(при помощи метода filter())
    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((item) => item !== value),
      }));
    } else {
      //если нет,добавляем
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    }
  }
};
