import { CartPage } from '@/components/cart-page/cart-page';
import React from 'react';

const Cart = ({ params }: { params: { cartId: string } }) => {
  return <CartPage cartId={params.cartId} />;
};

export default Cart;
