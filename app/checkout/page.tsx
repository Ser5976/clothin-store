import { getDelivery } from '@/actions/get_delivery';
import { BreadcrumbComponentCheckout } from '@/components/checkout/breadcrumb';
import { CheckoutPage } from '@/components/checkout/checkout-page';
import React from 'react';

const Checkout = async () => {
  const delivery = await getDelivery();
  return (
    <main>
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <BreadcrumbComponentCheckout />
        </div>
      </div>

      <div className="shared_container  pt-[2%]">
        <CheckoutPage delivery={delivery} />
      </div>
    </main>
  );
};

export default Checkout;
