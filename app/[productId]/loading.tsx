import { Loader } from 'lucide-react';
import React from 'react';

export default function loading() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
