import { Favorites, Role } from '@prisma/client';
import { User } from 'next-auth';
import 'next-auth/jwt';

// всё для того,что бы прокинуть в типы next-auth id и role

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    role: Role;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & { id: UserId; role: Role };
  }
}
