import { BillboardType } from './../types/carousel_type';
export const getBillboard = async (): Promise<BillboardType[] | null> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/billboard`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return null;
  }
  const billboards = res.json();
  return billboards;
};
