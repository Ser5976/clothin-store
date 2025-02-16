import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export async function GET(request: Request) {
  try {
    const currentYear = new Date().getFullYear(); // Получаем текущий год
    // Получаем все заказы из базы
    const orders = await prismadb.order.findMany({
      where: {
        createdAt: {
          gte: new Date(`${currentYear}-01-01T00:00:00.000Z`), // От 1 января текущего года
          lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`), // До 1 января следующего года
        },
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    // Создаём объект с 12 месяцами и заполняем его нулями
    const salesData = Array.from({ length: 12 }, (_, i) => ({
      month: monthNames[i],
      totalOrders: 0,
      totalSales: 0,
    }));

    // Группируем заказы по месяцам
    orders.forEach((order) => {
      const month = order.createdAt.getMonth(); // Получаем номер месяца (0 - Январь, 11 - Декабрь)
      salesData[month].totalOrders += 1;
      salesData[month].totalSales += Number(order.amount);
    });

    return NextResponse.json(salesData);
  } catch (error) {
    console.log('ORDER ERRROR:', error);
    return NextResponse.json(
      { error: 'Ошибка получения данных о продажах' },
      { status: 500 }
    );
  }
}
