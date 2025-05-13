import {
  RegisterDataType,
  RegisterValidator,
} from './../../../validators/register-validator';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { hash, genSalt } from 'bcryptjs';

export async function POST(request: Request) {
  // получение данных из request
  const body: RegisterDataType = await request.json();
  // console.log('Body:', body);
  // валидация body при помощи zod
  const validation = RegisterValidator.safeParse(body);
  console.log('validation:', validation);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  //проверка на сущестовования  админа в базе
  const admin = await prismadb.user.findFirst({ where: { role: 'ADMIN' } });

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
  // хэширование пароля
  const salt = await genSalt(7);
  body.password = await hash(body.password, salt);
  // создаём нового пользователя
  const user = await prismadb.user.create({
    data: body,
  });
  // если это первый пользователь, то он будет автоматически админом
  if (!admin) {
    await prismadb.user.update({
      where: { id: user.id },
      data: { role: 'ADMIN' },
    });
  }

  return NextResponse.json({ message: 'You are registered' });
}
