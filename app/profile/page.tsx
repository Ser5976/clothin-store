import { getUser } from '@/actions/get_user';
import PersonalData from '@/components/profile/personal-data/personal-data';
import { Loader } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import { authOptions } from '../api/auth/config/auth_options';

const PersonalDataPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/');
  const user = await getUser(session.user.id);
  //console.log('user:', user);

  return (
    <Suspense fallback={<PersonalDataFallback />}>
      <PersonalData user={user} />
    </Suspense>
  );
};

export default PersonalDataPage;

function PersonalDataFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
