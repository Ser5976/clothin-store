import { getOrder } from '@/actions/get_order';
import { BreadcrumbComponentOrder } from '@/components/order/breadcrumb';
import { OrderPage } from '@/components/order/order-page';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

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
        <Suspense fallback={<OrderBarFallback />}>
          <OrderPage order={order} />
        </Suspense>
      </div>
    </main>
  );
};
function OrderBarFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}

export default Order;
