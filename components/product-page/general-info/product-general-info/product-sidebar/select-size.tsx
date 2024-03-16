'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SizeType } from '@/types/size_type';
import styles from './product-sidebar.module.css';
import { Dispatch, FC, memo, SetStateAction } from 'react';

type SelectSizeProps = {
  sizes:
    | {
        size: SizeType;
      }[]
    | undefined;
  sizeName: string | boolean;
  setSizeName: Dispatch<SetStateAction<string | boolean>>;
};

// здесь мы сделали оптимизацию при помощи React.memo,чтобы избежать ненужных рендеренгов,
//т.к. в родители есть useState
const SelectSize: FC<SelectSizeProps> = ({ sizes, sizeName, setSizeName }) => {
  return (
    <Select onValueChange={(value) => setSizeName(value)}>
      <SelectGroup>
        <SelectLabel className={styles.label_size}>Size</SelectLabel>
        <SelectTrigger className="w-[50%] sm:w-[45%]">
          <SelectValue placeholder="Please select" />
        </SelectTrigger>

        <SelectContent>
          {sizes?.map((obj) => {
            return (
              <SelectItem
                key={obj.size?.id}
                value={obj.size ? obj.size.value : ''}
              >
                {obj.size?.value}
              </SelectItem>
            );
          })}
        </SelectContent>
      </SelectGroup>
    </Select>
  );
};

export default memo(SelectSize);
