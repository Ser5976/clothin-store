import { getDelivery } from '@/actions/get_delivery';
import { BreadcrumbComponentCheckout } from '@/components/checkout/breadcrumb';
import { CheckoutPage } from '@/components/checkout/checkout-page';
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';

const Checkout = async () => {
  const delivery = await getDelivery();
  // console.log('delivery:', delivery);
  const editedDilivery =
    delivery.length === 0
      ? { standartPrice: '5', expressPrice: '10', orderPrice: '500' }
      : {
          standartPrice: delivery[0].standartPrice,
          expressPrice: delivery[0].expressPrice,
          orderPrice: delivery[0].orderPrice,
        };

  return (
    <main>
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <BreadcrumbComponentCheckout />
        </div>
      </div>

      <div className="shared_container  pt-[2%]">
        <Suspense fallback={<CheckoutBarFallback />}>
          <CheckoutPage delivery={editedDilivery} />
        </Suspense>
      </div>
    </main>
  );
};

function CheckoutBarFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
export default Checkout;
