'use server';
import { utapi } from 'uploadthing/server';

// удаление изображения в облачном хранилищи
export const deleteImg = async (url: string) => {
  await utapi.deleteFiles(url);
};
