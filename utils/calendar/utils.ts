import {
  addDays,
  getWeeksInMonth,
  isPast,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ReminderI } from "types/user.interface";

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

const getActualRemindersByUniqueDates = (reminders: ReminderI[]) => {
  const uniqueDatesFromReminders =
    getSortedUniqueDatesFromActualReminders(reminders);

  const actualReminders = reminders.filter(
    (reminder) => !reminder.notified && !isPast(reminder.date)
  );

  const actualRemindersSortedByDates = uniqueDatesFromReminders.reduce(
    (acc, uniqueDate) => {
      const remindersByDate: ReminderI[] = [];

      actualReminders.forEach((reminder) => {
        if (reminder.date === uniqueDate) remindersByDate.push(reminder);
      });

      acc.push({
        date: new Date(uniqueDate).toLocaleDateString("pl", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        reminders: remindersByDate,
      });

      return acc;
    },
    [] as { date: string; reminders: ReminderI[] }[]
  );

  return actualRemindersSortedByDates;
};

const getSortedUniqueDatesFromActualReminders = (reminders: ReminderI[]) => {
  const dates = reminders.map((reminder) => reminder.date);

  const uniqueDates = Array.from(new Set(dates));

  return uniqueDates.sort((a, b) => a - b);
};

export { createFormatedMonthDays, getActualRemindersByUniqueDates };
