import { addDays, getWeeksInMonth, startOfMonth, startOfWeek } from "date-fns";

const DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;

const createFormatedMonthDays = (dateToGenerateWeek: Date) => {
  const month = createMonthDays(dateToGenerateWeek);

  const result = month.reduce((acc, week) => {
    const formatedWeek = week.map((dayTimestamp) => {
      return {
        timestamp: dayTimestamp,
        number: new Date(dayTimestamp).getDate(),
      };
    });

    return [...acc, formatedWeek];
  }, [] as { timestamp: number; number: number }[][]);

  return result;
};

const createMonthDays = (dateToGenerateWeek: Date) => {
  let startDate = startOfMonth(dateToGenerateWeek);
  const howManyWeeksInMonth = getWeeksInMonth(startDate, { weekStartsOn: 1 });

  const monthDays: number[][] = [];

  for (let i = 0; i < 6; i++) {
    const week = createWeekDays(startDate);

    monthDays.push(week);

    startDate = addDays(startDate, 7);
  }

  return monthDays;
};

const createWeekDays = (dateToGenerateWeek: Date) => {
  const firstDayOfWeek = startOfWeek(dateToGenerateWeek, { weekStartsOn: 1 });

  const weekDays: number[] = [];

  for (let i = 0; i < 7; i++) {
    weekDays.push(
      new Date(firstDayOfWeek.getTime() + i * DAY_IN_MILISECONDS).getTime()
    );
  }

  return weekDays;
};

export { createFormatedMonthDays };
