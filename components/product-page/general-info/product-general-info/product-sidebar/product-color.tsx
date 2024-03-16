import { cn } from '@/lib/utils';
import { ColorType } from '@/types/color_type';
import { Dispatch, FC, memo, SetStateAction } from 'react';
import styles from './product-sidebar.module.css';

type ProductColorProps = {
  colors: { color: ColorType }[];
  colorName: string | boolean;
  setColorName: Dispatch<SetStateAction<string | boolean>>;
};

// здесь мы сделали оптимизацию при помощи React.memo,чтобы избежать ненужных рендеренгов,
//т.к. в родители есть useState
const Productcolor: FC<ProductColorProps> = ({
  colors,
  colorName,
  setColorName,
}) => {
  return (
    <div className="flex flex-col gap-[10px] ">
      <div className={styles.color_title}> Select color</div>

      <div className="flex gap-[1.5%]">
        {colors.map((obj) => {
          return (
            <div
              key={obj.color.id}
              className="w-6 h-6 relative cursor-pointer"
              onClick={() => setColorName(obj.color.name)}
            >
              <div
                className={cn(styles.outer_circle, {
                  [styles.outer_circle_active]: colorName === obj.color.name,
                })}
              ></div>
              <div
                style={{ backgroundColor: obj.color.value }}
                className={styles.inner_circle}
              ></div>
            </div>
          );
        })}
        <div className={styles.color_name}>{colorName ?? colorName}</div>
      </div>
    </div>
  );
};
export default memo(Productcolor);
