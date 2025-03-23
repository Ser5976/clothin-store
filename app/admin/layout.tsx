import { AdminHeader } from '@/components/admin/admin-header';
import { BreadcrumbAdmin } from '@/components/admin/breadcrumb-admin';
import { NavigationAdmin } from '@/components/admin/navigation-admin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <BreadcrumbAdmin />
        </div>
      </div>
      <div className="shared_container">
        <AdminHeader />
      </div>
      <div className="shared_container  pt-[2%] pb-[5%] grid grid-cols-1 gap-5 min-[900px]:grid-cols-4">
        <div className="hidden min-[900px]:block ">
          <NavigationAdmin />
        </div>

        <div className=" col-span-1 min-[900px]:col-span-3">{children}</div>
      </div>
    </div>
  );
}
