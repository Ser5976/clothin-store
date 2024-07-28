import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const SortBy = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  //сортировку делаем при помощи адресной сторки.
  //Т.к. в useSearchParams() 'next/navigation'мы можем только читать а изменять,добавлять не можем ,
  //мы используем метод  js new URLSearchParams()
  // добавляем в него searchParams , чтобы он знал какие параметры есть, ну дальше меняем,добавляем
  const sort = (value: string) => {
    if (searchParams.get('sort')) {
      params.set('sort', value);
    } else {
      params.append('sort', value);
    }
    router.push(`${pathname}?${params}`);
  };

  // при помощи switch case изменяем объект для сортировки
  const getSorting = (value: string) => {
    switch (value) {
      case 'priceAsc':
        sort(value);
        break;
      case 'priceDesc':
        sort(value);
        break;
      case 'ratingAsc':
        sort(value);
        break;
      case 'ratingDesc':
        sort(value);
        break;
      default:
        sort(value);
        break;
    }
  };
  return (
    <Select
      onValueChange={getSorting}
      defaultValue={searchParams.get('sort') ?? undefined}
    >
      <SelectTrigger className=" w-[110px] h-9    xl:h-11">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent className=" absolute top-[-200px] left-[-10px]">
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="priceAsc"> low price </SelectItem>
          <SelectItem value="priceDesc">high price</SelectItem>
          <SelectItem value="ratingAsc"> low rating</SelectItem>
          <SelectItem value="ratingDesc"> high rating</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
