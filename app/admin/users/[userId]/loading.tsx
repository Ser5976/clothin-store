import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
