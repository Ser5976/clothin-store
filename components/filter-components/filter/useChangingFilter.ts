import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// это кастомный хук, который мы используем для фильтрации
//фильтрацию делаем при помощи URL
//Т.к. в useSearchParams() 'next/navigation'мы можем только читать а изменять,добавлять не можем ,
//мы используем метод  js new URLSearchParams()
// добавляем в него searchParams , чтобы он знал какие параметры есть, ну а дальше меняем,добавляем
export const useChangingFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const changingFilter = (key: string, value: string) => {
    if (key === 'categoryId') {
      if (
        searchParams.get('categoryId') &&
        searchParams.get('categoryId') === value
      ) {
        params.delete('categoryId');
      } else if (searchParams.get('categoryId')) {
        params.set('categoryId', value);
      } else {
        params.append('categoryId', value);
      }
      router.push(`${pathname}?${params}`);
    } else {
      // здесь у нас предполагается массив значений, поэтому нужно немного заморочиться
      // первое проверяем есть ли выбранное значение в адресной строке
      const check = searchParams.getAll(key).includes(value);
      // если есть, нам нужно его удалить
      if (check) {
        //фильтруем и сохраняем оставшиеся значения
        const filteredArray = searchParams
          .getAll(key)
          .filter((item) => item !== value);
        // удаляем все из адресной строки
        params.delete(key);
        // изаписываем новые отфильтрованные
        filteredArray.forEach((item) => params.append(key, item));
      } else {
        params.append(key, value);
      }

      router.push(`${pathname}?${params}`);
    }
  };
  return { changingFilter };
};
