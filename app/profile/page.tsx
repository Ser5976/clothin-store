import { getUser } from '@/actions/get_user';
import PersonalData from '@/components/profile/personal-data/personal-data';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from '../api/auth/config/auth_options';

const PersonalDataPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/');
  const user = await getUser(session.user.id);
  // console.log('user:', user);

  return <PersonalData user={user} />;
};

export default PersonalDataPage;
