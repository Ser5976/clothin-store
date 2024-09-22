import Header from './header';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />
      <div className="">{children}</div>
    </div>
  );
}
