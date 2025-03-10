import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// кастомная ошибка
export class CustomError extends Error {
  code: number;
  details?: string;
  constructor(message: string, code: number, details?: string) {
    super(message); // Устанавливает `message` в стандартный объект `Error`
    this.code = code; // Уникальный код ошибки
    this.details = details; // Дополнительные данные
  }
}
