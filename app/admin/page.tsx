import AdminPage from '@/components/admin/admin-page';

export const dynamic = 'force-dynamic';

const Admin = async () => {
  return (
    <main className=" flex flex-col gap-5">
      <AdminPage />
    </main>
  );
};
export default Admin;
