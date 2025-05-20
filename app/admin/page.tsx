import { getSales } from '@/actions/get_sales';
import AdminPage from '@/components/admin/admin-page';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const Admin = async () => {
  return (
    <main className=" flex flex-col gap-5">
      <AdminPage />
    </main>
  );
};
export default Admin;
