import { DateTime } from 'luxon';

export const parseStringToTime = (value: string) => DateTime.fromFormat(value, 'HH:mm').toJSDate();

export const parseStringToDate = (value: string) => DateTime.fromFormat(value, 'yyyy-MM-dd').toJSDate();

export const parseDateToString = (value?: Date) => {
  if (!value) {
    return null;
  }

  return DateTime.fromJSDate(value).toUTC().toFormat('yyyy-MM-dd');
};

export const firstName = (fullName: string) => {
  const names = fullName.split(' ');

  return names[0];
};
