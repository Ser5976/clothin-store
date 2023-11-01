import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/config/auth_options';
import { SizeDataType } from '@/validators/size-validator';
import prismadb from '@/lib/prismadb';

interface Props {
  searchParams: { test: string | string[]; sest: string | string[] };
}

const getSizes = async (): Promise<any> => {
  const res = await fetch('http://localhost:3000/api/size', {
    method: 'GET',
    headers: headers(),
    cache: 'no-store',
  });

  return res.json();
};

export default async function Home({ searchParams: { test, sest } }: Props) {
  const session = await getServerSession(authOptions);

  /* const dataBrand = await prismadb.brand.findMany({
    where: {
      name: {
        in: ['Adidas', 'Calvin Klein', 'Columbia'],
      },
    },
  }); */
  // console.log('DataBarand:', dataBrand);
  const product = {
    name: 'продукт 8',
    price: 35,
    description: 'описание 8',
    image: [
      {
        url: 'https://utfs.io/f/71e846ce-5fda-43ea-9023-69f1cbd7f07f-h40jwx.jpg',
        fileKey: '71e846ce-5fda-43ea-9023-69f1cbd7f07f-h40jwx.jpg',
      },
      {
        url: 'https://utfs.io/f/71e846ce-5fda-43ea-9023-69f1cbd7f07f-h40jwx.jpg',
        fileKey: '71e846ce-5fda-43ea-9023-69f1cbd7f07f-h40jwx.jpg',
      },
    ],
    categoryId: '90f1e0cd-ac02-4ca9-9833-c84d1f676e3a',
    brandId: '29fa918a-64e8-464b-9086-fdf33e563454',
    typeId: '8daf363a-a732-4c20-9ff2-2ca1d31f0ade',
    materialId: 'aa1ca751-f5ce-4f80-af2c-39418fc60674',
    sizeId: '118d7aff-297b-4066-b47f-66717abbeb52',
    colorId: 'c0661cf7-183a-4d2f-9e07-c252ddb71e0a',
  };

  /* const dataProduct = await prismadb.product.update({
    where: { id: 'bece8cbf-657a-45e2-8e39-3fa334570f30' },
    data: {
      name: product.name,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      typeId: product.typeId,
      materialId: product.materialId,
      brandId: product.brandId,
      image: { create: product.image },
      sizeId: product.sizeId,
      colorId: product.colorId,
    },
  }); */
  const response = await getSizes();
  // console.log('homeResponse:', response);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello!!!
      {test}
      {sest}
    </main>
  );
}
