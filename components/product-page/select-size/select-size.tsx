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
import styles from './select-size.module.css';
import { Dispatch, FC, memo, SetStateAction } from 'react';
import { cn } from '@/lib/utils';

type SelectSizeProps = {
  sizes:
    | {
        size: SizeType;
      }[]
    | undefined;
  size: 'big' | 'small';
  setSizeName: Dispatch<SetStateAction<string>>;
};

// здесь мы сделали оптимизацию при помощи React.memo,чтобы избежать ненужных рендеренгов,
//т.к. в родители есть useState
const SelectSize: FC<SelectSizeProps> = ({ sizes, size, setSizeName }) => {
  return (
    <Select onValueChange={(value) => setSizeName(value)}>
      <SelectGroup>
        {size === 'big' && (
          <SelectLabel className={styles.label_size}>Size</SelectLabel>
        )}
        <SelectTrigger
          className={cn({
            [styles.selectTrigger_big]: size === 'big',
            [styles.selectTrigger_small]: size === 'small',
          })}
        >
          <SelectValue
            placeholder={size === 'big' ? 'Please select' : 'Size'}
          />
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
