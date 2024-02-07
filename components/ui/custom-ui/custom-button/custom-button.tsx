import { cn } from '@/lib/utils';
import React from 'react';
import { Button, ButtonProps } from '../../button';
import styles from './custom-button.module.css';

interface CustomButtonProps extends ButtonProps {
  small?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'outline',
  small = false,
  className,
  ...props
}) => {
  return (
    <Button
      className={cn(
        'border-[#17696A] text-[#17696A]font-bold   leading-[325%] tracking-wide',
        className,
        {
          [styles.small]: small,
          [styles.big]: !small,
        }
      )}
      variant={variant}
      {...props}
    />
  );
};
