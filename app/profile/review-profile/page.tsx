import { getUser } from '@/actions/get_user';
import { authOptions } from '@/app/api/auth/config/auth_options';
import PersonalReview from '@/components/profile/personal-review/personal-review';
import { Loader } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const ReviewProfile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/');
  const user = await getUser(session.user.id);
  // console.log('user:', user);
  return (
    <Suspense fallback={<ReviewProfileFallback />}>
      <PersonalReview
        productReviews={user?.review}
        storeReviews={user?.storeReviews}
      />
    </Suspense>
  );
};

export default ReviewProfile;
function ReviewProfileFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
