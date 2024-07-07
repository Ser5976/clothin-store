import { getOrder } from '@/actions/get_order';
import { BreadcrumbComponentOrder } from '@/components/order/breadcrumb';
import { OrderPage } from '@/components/order/order-page';

const Order = async ({ params }: { params: { orderId: string } }) => {
  const order = await getOrder(params.orderId);
  return (
    <main>
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <BreadcrumbComponentOrder />
        </div>
      </div>

      <div className="shared_container  pt-[2%]">
        <OrderPage order={order} />
      </div>
    </main>
  );
};

export default Order;
