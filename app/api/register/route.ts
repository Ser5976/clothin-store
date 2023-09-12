import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { hash, genSalt } from 'bcryptjs';

interface IRegistrationData {
  email: string;
  name?: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    // получение данных из request
    const body: IRegistrationData = await request.json();
    console.log('Body:', body);
    //проверка на существование в базе  email
    const candidate = await prismadb.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (candidate)
      return NextResponse.json('A user with such an email already exist', {
        status: 400,
      });
    //throw new Error('A user with such an email already exist')
    // хэширование пароля
    const salt = await genSalt(7);
    body.password = await hash(body.password, salt);
    // создаём нового пользователя
    await prismadb.user.create({
      data: body,
    });

    return NextResponse.json({ message: 'You are registered' });
  } catch (error) {
    console.log('ERRRRROOOORRRR!!!!', error);
  }
}
