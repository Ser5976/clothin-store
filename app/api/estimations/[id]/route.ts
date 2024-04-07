import prismadb from '@/lib/prismadb';
import {
  ReviewUpdateDataType,
  ReviewUpdateValidator,
} from '../../../../validators/reviewUpdate-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

//Это API мы используем для аналитики в product-reviews
// из базы получаем данные по оценкам выбранного товара, при помощи агрегации
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const estimationCounts = await prismadb.estimation.groupBy({
      where: {
        productId: params.id,
      },
      by: ['value'],
      _count: {
        value: true,
      },
    });
    // Дальше  полученную структуру данных мы преобразуем в удобную для нас струкуру
    // это массив объектов со значениями номер оценки (от 1 до 5),количество кажной оценки и процент каждой оценки

    //при помощи метода reduce() выщитывает  колличество всех оценок( т.е. сколько поставлено оценок),
    // это нужно для рассчёта % для каждой оценки
    const totalRatings = estimationCounts.reduce(
      (acc, obj) => acc + obj._count.value,
      0
    );
    // создаём структуру данных Map,это колекция ключ/значение, как и в объекте,
    //но  Map позволяет использовать ключи любого типа, это нам нужно ,потому что наши ключи будут number
    const percentageRatings = new Map();
    // при помощи метода forEach() рассчитываем процент для каждой оценки и записываем в нашу колекцию
    estimationCounts.forEach((estimation) => {
      percentageRatings.set(
        estimation.value,
        (estimation._count.value / totalRatings) * 100
      );
    });
    // ну и эпогей, создаём наш массив объектов
    const ratingsArray = Array.from({ length: 5 }, (_, index) => {
      //это сама оценка(т.е. 1 или 2 или 3 или 4 или 5)
      const ratingValue = index + 1;
      //здесь мы определяем количество той  или иной оценки, а если количества нет в наших данных , той оценки ставим 0
      // делаем при помощи метода find(),выщемливаем в наших данных, если есть,
      //нужный на объект с количеством для данной оценки,берём это количество ,если нет - ставим 0
      const ratingCount =
        estimationCounts.find((rating) => rating.value === ratingValue)?._count
          .value || 0;
      // ну и процент для оценки, здесь по легче,проверяем по ключу если  у нас в колекции такое значение,
      //если нет стави 0
      const ratingPercentage = percentageRatings.get(ratingValue) || 0;
      // и это наш объект
      return {
        rating: ratingValue,
        count: ratingCount,
        percentage: ratingPercentage,
      };
    });

    return NextResponse.json(ratingsArray);
  } catch (error) {
    return NextResponse.json('Reviews is dont received', { status: 500 });
  }
}
