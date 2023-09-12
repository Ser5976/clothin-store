import type { AuthOptions, User } from 'next-auth';
import { compare } from 'bcryptjs';
import type { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prismadb from '@/lib/prismadb';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { Role } from '@prisma/client';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb) as Adapter | undefined,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        console.log('credentials:', credentials);
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.log('USEEEER!!!!:', user);
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password as string
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    session: ({ session, token }) => {
      // console.log('Session Callback', { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id, // чтобы мы видили их в useSession и getServerSession(), а типы смотри next-auth.d.ts
          role: token.role, // -//-
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log('JWT Callback', { token, user });
      if (user) {
        const u = user as User & { id: string; role: Role };
        return {
          ...token,
          id: u.id,
          role: u.role,
        };
      }
      return token;
    },
  },
};
