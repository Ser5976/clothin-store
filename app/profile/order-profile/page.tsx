import { getUser } from '@/actions/get_user';
import { authOptions } from '@/app/api/auth/config/auth_options';
import PersonalOrders from '@/components/profile/personal-orders/personal-orders';
import { Loader } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const OrderProfile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/');
  const user = await getUser(session.user.id);
  return (
    <Suspense fallback={<OrderProfileFallback />}>
      <PersonalOrders orders={user?.order} />
    </Suspense>
  );
};

export default OrderProfile;
function OrderProfileFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
