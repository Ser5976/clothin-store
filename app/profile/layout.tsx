import Header from './header';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/*@ts-expect-error server component */}
      <Header />
      <div className="">{children}</div>
    </div>
  );
}
