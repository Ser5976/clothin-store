import { UserType } from '@/types/user_type';

export const getUsers = async (): Promise<UserType[] | null> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
    next: { tags: ['users'] },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return null;
  }
  const users = res.json();
  return users;
};
