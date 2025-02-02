import OrderPage from '@/components/admin/orders/order-page';

const Order = async ({ params }: { params: { orderId: string } }) => {
  return <OrderPage orderId={params.orderId} />;
};
export default Order;
