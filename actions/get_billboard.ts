import { BillboardType } from './../types/carousel_type';
export const getBillboard = async (): Promise<BillboardType[] | undefined> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/billboard`, {
      next: { revalidate: 60 },
    });
    return res.json();
  } catch (error) {
    console.log('error billboard:', error);
  }
};
