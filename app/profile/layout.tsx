import { BreadcrumbProfile } from '@/components/profile/breadcrumb-profile';
import { ProfileNavigation } from '@/components/profile/profile-navigation';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="bg-[#F4F5F6] py-4">
        <div className="shared_container">
          <BreadcrumbProfile />
        </div>
      </div>

      <div className="shared_container  pt-[2%] pb-[5%]">
        <p className="text-zinc-800 text-[36px] font-black  leading-[130%] my-[3%] lg:text-[46px]">
          Profile
        </p>
        <ProfileNavigation />

        <div className="">{children}</div>
      </div>
    </div>
  );
}
