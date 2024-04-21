import { Button } from '@/components/ui/button';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Select } from '@radix-ui/react-select';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
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
  setShow: Dispatch<SetStateAction<boolean>>;
};
const ReviewsToolbar: FC<ReviewsToolbarProps> = ({ setSort, setShow }) => {
  // console.log('Render:ReviewsToolbar');

  return (
    <div className=" flex justify-between mb-[60px] max-md:mb-[40px]">
      <LeaveRevieButton setShow={setShow} />
      <SortReviews setSort={setSort} />
    </div>
  );
};
export default memo(ReviewsToolbar);

const LeaveRevieButton = ({
  setShow,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  //проверка авторизации(отзыв может написать только авторизованный пользователь)
  const { data } = useSession();
  // для редиректа на логин и обратно при авторизации
  const path = usePathname();
  const router = useRouter();
  const openModal = () => {
    if (data) {
      setShow(true);
      // При открытии модального окна убираем скролл(причина в select shadcn,
      //при открытии select в модалки исчезает скролл поэтому дергается макет,так тоже дергается но... )
      document.body.classList.add('modal_open');
    } else {
      router.push(`/signin?callbackUrl=${path}`);
    }
  };
  return (
    <Button
      size="sm"
      className=" text-[14px] h-11 bg-cyan-800 w-[180px] hover:bg-cyan-900 max-md:w-[150px] "
      onClick={openModal}
    >
      Leave a review
    </Button>
  );
};

const SortReviews = ({
  setSort,
}: {
  setSort: Dispatch<SetStateAction<SortType>>;
}) => {
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
  );
};
