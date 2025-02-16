import { getSales } from '@/actions/get_sales';
import AdminPage from '@/components/admin/admin-page';

const Admin = async () => {
  const salesData = await getSales();
  return (
    <main className=" flex flex-col gap-5">
      <h1 className="text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl text-center">
        The admin panel
      </h1>
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
