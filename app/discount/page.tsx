import { getDiscount } from '@/actions/get_discount';
import React from 'react';

const Discount = async () => {
  //запрос для получения товаров,которые сейчас в тренде, на сервере при помощи fech(динамически)
  const discount = getDiscount();
  return <div>Discount </div>;
};

export default Discount;
