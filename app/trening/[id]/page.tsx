import prismadb from '@/lib/prismadb';
import React from 'react';
import FormSize from '../form-size';
type PropsType = {
  params: { id: string };
};
const Size = async ({ params }: PropsType) => {
  console.log('Params:', params);
  const data = await prismadb.size.findUnique({
    where: {
      id: params.id,
    },
  });
  // console.log('EditSize:', data);
  return (
    <div className="flex min-h-screen gap-10 p-24">
      <FormSize params={data} />
    </div>
  );
};

export default Size;
