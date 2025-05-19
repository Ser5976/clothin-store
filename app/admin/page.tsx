import { getSales } from '@/actions/get_sales';
import AdminPage from '@/components/admin/admin-page';

export const dynamic = 'force-dynamic';

const Admin = async () => {
  const salesData = await getSales();
  //console.log('sales,:', salesData);
  return (
    <main className=" flex flex-col gap-5">
      {salesData ? (
        <AdminPage salesData={salesData} />
      ) : (
        <h1 className=" text-red-500 text-lg font-semibold mb-4 text-center">
          No sales data has been recieved
        </h1>
      )}
    </main>
  );
};
export default Admin;
