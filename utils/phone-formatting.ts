// форматируем номер телефона,чтобы он записался в базу так как мы вносим
//в оригинале просто строка цифр без + ,скобок и пробелов
export const formattedPhone = (value: string): string => {
  return `+${value.slice(0, 3)} (${value.slice(3, 5)}) ${value.slice(
    5,
    8
  )} ${value.slice(8, 10)} ${value.slice(10, 12)}`;
};
