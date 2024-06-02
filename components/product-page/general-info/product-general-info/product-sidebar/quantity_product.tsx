import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';
import styles from './product-sidebar.module.css';

type QuantityProductProps = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

export const QuantityProduct: FC<QuantityProductProps> = ({
  quantity,
  setQuantity,
}) => {
  const plusOne = () => {
    setQuantity((prev) => prev + 1);
  };
  const minusOne = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };
  return (
    <div className={styles.quantity_wrapper}>
      <div className={styles.quantity}>{quantity}</div>
      <div className={styles.quantity_icons}>
        <ArrowBigUp
          size={18}
          color="#17696A"
          className=" cursor-pointer mb-[-2px] fill-cyan-800 transition-colors hover:fill-cyan-900 "
          onClick={plusOne}
        />
        <ArrowBigDown
          size={18}
          color="#17696A"
          className=" cursor-pointer mt-[-2px]  fill-cyan-800 transition-colors hover:fill-cyan-900 "
          onClick={minusOne}
        />
      </div>
    </div>
  );
};
