import moment from 'moment'; //библиотека по форматированию даты
import 'moment/locale/en-au';

//форматирование даты( пример:24 ноября 2022)
export const dateFormatting = (date: string) => {
  const newDate = moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY');
  return newDate;
};

//форматирование даты рождения(пример:10.07.1988)
export const dateFormattingBirthday = (date: string) => {
  const newDate = moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY');
  return newDate;
};
