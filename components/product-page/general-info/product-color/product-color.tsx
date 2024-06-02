import { cn } from '@/lib/utils';
import { ColorType } from '@/types/color_type';
import { Dispatch, FC, memo, SetStateAction } from 'react';
import styles from './product-color.module.css';

type ProductColorProps = {
  colors: { color: ColorType }[];
  size: 'big' | 'small';
  colorName: string;
  setColorName: Dispatch<SetStateAction<string>>;
};

// здесь мы сделали оптимизацию при помощи React.memo,чтобы избежать ненужных рендеренгов,
//т.к. в родители есть useState
const Productcolor: FC<ProductColorProps> = ({
  colors,
  size = 'big',
  colorName,
  setColorName,
}) => {
  return (
    <div className="flex flex-col gap-[10px] ">
      {size === 'big' && (
        <div className={styles.color_title}> Select color</div>
      )}

      <div className="flex gap-[1.5%]">
        {colors.map((obj) => {
          return (
            <div
              key={obj.color.id}
              className={cn({
                [styles.wrapper_circle]: size === 'big',
                [styles.wrapper_circle_small]: size === 'small',
              })}
              onClick={() => setColorName(obj.color.name)}
            >
              <div
                className={cn({
                  [styles.outer_circle]: size === 'big',
                  [styles.outer_circle_small]: size === 'small',
                  [styles.outer_circle_active]: colorName === obj.color.name,
                })}
              ></div>
              <div
                style={{ backgroundColor: obj.color.value }}
                className={cn({
                  [styles.inner_circle]: size === 'big',
                  [styles.inner_circle_small]: size === 'small',
                })}
              ></div>
            </div>
          );
        })}
        {size === 'big' && (
          <div className={styles.color_name}>{colorName ?? colorName}</div>
        )}
      </div>
    </div>
  );
};
export default memo(Productcolor);
