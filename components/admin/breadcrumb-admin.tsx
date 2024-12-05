'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { HomeIcon } from 'lucide-react';

import { usePathname } from 'next/navigation';

export const BreadcrumbAdmin = () => {
  // Т.к. много путей , пришлось костылить
  const pathname = usePathname();
  // форматоривание адресной стоки в массив значений, по разделителю('/'),f
  //ilter(Boolean), чтобы убрать пустые значения сначала и конца
  const arrayPathname = pathname.split('/').filter(Boolean);
  const secondPath = arrayPathname[1];
  const thirdPath = arrayPathname[2];
  // функция изменения первой буквы на заглавную
  function capitalizeFirstLetter(word: string | undefined) {
    if (!word) return;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className=" text-gray-400 hover:text-gray-900"
          >
            <HomeIcon size={16} strokeWidth={1.5} />
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/admin"
            className={
              thirdPath || secondPath ? ' text-gray-400' : ' text-gray-900'
            }
          >
            Admin
          </BreadcrumbLink>
        </BreadcrumbItem>
        {secondPath ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/admin/${secondPath}`}
                className={thirdPath ? ' text-gray-400' : ' text-gray-900'}
              >
                {capitalizeFirstLetter(secondPath)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : null}

        {thirdPath ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/admin/${thirdPath}`}
                className={' text-gray-900'}
              >
                {capitalizeFirstLetter(thirdPath)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
