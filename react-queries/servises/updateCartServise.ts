import axios from 'axios';

type UpdataType = {
  cartItemId: string | undefined;
  quantity: number;
  price: number;
  oldPrice: number | null;
};

export const updateCartServise = async (updataData: UpdataType) => {
  const data = await axios.put(`/api/cart/${updataData.cartItemId}`, {
    quantity: updataData.quantity,
    price: updataData.price,
    oldPrice: updataData.oldPrice,
  });
  return data;
};
