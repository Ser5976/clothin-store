import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/config/auth_options';

interface Props {
  searchParams: { test: string | string[]; sest: string | string[] };
}

export default async function Home({ searchParams: { test, sest } }: Props) {
  const session = await getServerSession(authOptions);
  console.log('test:', test);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello!!!
      {test}
      {sest}
    </main>
  );
}
