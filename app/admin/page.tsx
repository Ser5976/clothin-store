import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/config/auth_options';

const Admin = async () => {
  const session = await getServerSession(authOptions);
  /* if (session?.user.role !== 'ADMIN')
    return (
      <div className=" text-lg text-center text-red-500 mt-10">
        'You don't have administrator rights'
      </div>
    ); */
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello Admin!!!
    </main>
  );
};
export default Admin;
