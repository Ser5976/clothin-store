import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/config/auth_options';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello!!!
    </main>
  );
}
