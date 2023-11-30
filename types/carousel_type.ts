export type BillboardType = {
  id: string;
  title: string | null;
  subTitle: string | null;
  link: string;
  image: { url: string; fileKey: string };
};
