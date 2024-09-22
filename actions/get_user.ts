import { UserType } from '@/types/user_type';

export const getUser = async (userId: string): Promise<UserType | null> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${userId}`, {
    next: { tags: ['user'] },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    return null;
  }
  const user = res.json();
  return user;
};
