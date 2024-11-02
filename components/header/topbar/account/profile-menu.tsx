import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import styles from './account.module.css';
import { cn } from '@/lib/utils';
import { UserCircle2 } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export function ProfileMenu({
  avatar,
  email,
}: {
  avatar: string | undefined;
  email: string | undefined;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {avatar ? (
          <div className={cn(styles.login, styles.login_active)}>
            <Image
              src={avatar}
              className="w-[20px] h-[20px] rounded-full"
              alt="картинка"
              width={100}
              height={100}
            />
            Account
          </div>
        ) : (
          <div className={cn(styles.login, styles.login_active)}>
            <UserCircle2 size={20} color="white" strokeWidth={1.5} />
            Account
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className=" flex flex-col items-center">
            <div>
              {avatar ? (
                <div>
                  <Image
                    src={avatar}
                    className="w-[50px] h-[50px] rounded-full"
                    alt="картинка"
                    width={150}
                    height={150}
                  />
                </div>
              ) : (
                <div>
                  <UserCircle2 size={50} color=" black" strokeWidth={1.5} />
                </div>
              )}
            </div>
            <div className=" font-normal text-gray-400">
              {email ? email : ''}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile">Persolan data</Link>

            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/profile/review-profile"> Your reviews</Link>
            <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/profile/order-profile">Youre orders</Link>
            <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: '/',
            })
          }
        >
          Log out
          <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}