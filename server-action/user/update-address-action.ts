'use server';
import { PersonalAddressFormType } from './../../validators/personal-address-form-validator';
import { authOptions } from '@/app/api/auth/config/auth_options';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { revalidateTag } from 'next/cache';

export const updateAddressAction = async ({
  address,
}: {
  address: PersonalAddressFormType;
}) => {
  try {
    const session = await getServerSession(authOptions);
    // console.log('session from server action:', session);
    if (!session?.user) {
      throw new Error('Unauthorized');
    }
    //console.log('address:', address);
    await prismadb.user.update({
      where: { id: session.user.id },
      data: {
        address: {
          upsert: {
            create: {
              country: address.country,
              city: address.city,
              street: address.street,
              house: address.house,
              flat: address.flat,
            },
            update: {
              country: address.country,
              city: address.city,
              street: address.street,
              house: address.house,
              flat: address.flat,
            },
          },
        },
      },
    });
    revalidateTag('user');
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};
