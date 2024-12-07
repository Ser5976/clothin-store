'use client';
import styles from './admin.module.css';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  ListChecks,
  LogOut,
  Rows,
  Shield,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export const NavigationAdmin = () => {
  const router = useRouter();
  const pathName = usePathname();
  // console.log('pathName:', pathName);

  return (
    <div className=" col-span-1">
      <div className="relative pl-9  py-1">
        <Shield className="absolute top-[7px] left-2 w-5 h-5" />
        <span className="text-lg">The admin panel</span>
      </div>
      <div className="px-5 m-3 bg-transparent border-b"></div>
      <ul>
        <Link
          href="/admin/users"
          className={cn(styles.link, {
            [styles.activeLink]: `${pathName.split('/')[2]}` === 'users',
            [styles.hover]: `${pathName.split('/')[2]}` !== 'users',
          })}
        >
          <Users
            className={cn(styles.icons, {
              [styles.activeIcons]: `${pathName.split('/')[2]}` === 'users',
            })}
          />
          <span>Users</span>
        </Link>
        <Link
          href="/admin/products"
          className={cn(styles.link, {
            [styles.activeLink]: `${pathName.split('/')[2]}` === 'products',
            [styles.hover]: `${pathName.split('/')[2]}` !== 'products',
          })}
        >
          <ShoppingCart
            className={cn(styles.icons, {
              [styles.activeIcons]: `${pathName.split('/')[2]}` === 'products',
            })}
          />
          <span>Products</span>
        </Link>
        <Link
          href="/admin/categories"
          className={cn(styles.link, {
            [styles.activeLink]: `${pathName.split('/')[2]}` === 'categories',
            [styles.hover]: `${pathName.split('/')[2]}` !== 'categories',
          })}
        >
          <ListChecks
            className={cn(styles.icons, {
              [styles.activeIcons]:
                `${pathName.split('/')[2]}` === 'categories',
            })}
          />
          <span>Categories</span>
        </Link>
        <Link
          href="/admin/types"
          className={cn(styles.link, {
            [styles.activeLink]: `${pathName.split('/')[2]}` === 'types',
            [styles.hover]: `${pathName.split('/')[2]}` !== 'types',
          })}
        >
          <Rows
            className={cn(styles.icons, {
              [styles.activeIcons]: `${pathName.split('/')[2]}` === 'types',
            })}
          />
          <span>Types</span>
        </Link>
      </ul>
      <div className="px-5 m-3 bg-transparent border-b"></div>
      <div
        className=" relative pl-9  py-1 cursor-pointer hover:bg-red-50 hover:text-red-400 "
        onClick={() => router.push('/')}
      >
        <LogOut className=" absolute top-[8px] left-2  w-[19px] h-[19px] text-red-400 " />
        <span className=" text-lg text-red-400">Exit</span>
      </div>
    </div>
  );
};
