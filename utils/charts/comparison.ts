import {
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  isSameWeek,
} from "date-fns";

import { generateBarData, getDataFromTimeRange } from "./utils";

import { ExpenseI, IncomeI } from "types/user.interface";

import { daysLabels, monthsLabels } from "@/constants/chartsConstants";

// Week

const getWeekComparisonData = (expenses: ExpenseI[], incomes: IncomeI[]) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, "week");
  const timeDependenceIncomes = getDataFromTimeRange(incomes, "week");

  const arrayOfExpensesValuesSortedByDays = sortDataByWeekDays(
    timeDependenceExpenses
  );
  const arrayOfIncomeValuesSortedByDays = sortDataByWeekDays(
    timeDependenceIncomes
  );

  const data = generateBarData(
    arrayOfExpensesValuesSortedByDays,
    arrayOfIncomeValuesSortedByDays,
    "week"
  );

  return data;
};

const sortDataByWeekDays = <T extends { date: number; value: number }>(
  data: T[]
) => {
  const sortedData = daysLabels.map((el, i) => {
    const weekdayData = data.filter((el) => {
      return getDay(el.date) - 1 === i && isSameWeek(el.date, new Date());
    });

    const sumOfValue = weekdayData.reduce((acc, element) => {
      acc += element.value;

      return acc;
    }, 0);

    return sumOfValue;
  });

  return sortedData;
};

// Month

const getMonthComparisonData = (expenses: ExpenseI[], incomes: IncomeI[]) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, "month");
  const timeDependenceIncomes = getDataFromTimeRange(incomes, "month");

  const arrayOfExpensesValuesSortedByMonths = sortDataByDays(
    timeDependenceExpenses
  );
  const arrayOfIncomeValuesSortedByMonths = sortDataByDays(
    timeDependenceIncomes
  );

  const data = generateBarData(
    arrayOfExpensesValuesSortedByMonths,
    arrayOfIncomeValuesSortedByMonths,
    "month"
  );

  return data;
};

const sortDataByDays = <T extends { date: number; value: number }>(
  data: T[]
) => {
  const daysInMonth = getDaysInMonth(new Date());

  const sortedData = Array(daysInMonth)
    .fill(0)
    .map((el, i) => {
      const dayData: T[] = data.filter((el) => getDate(el.date) === i + 1);

      const sumOfValue = dayData.reduce((acc, element) => {
        acc += element.value;

        return acc;
      }, 0);

      return sumOfValue;
    });

  return sortedData;
};

// Year

const getYearComparisonData = (expenses: ExpenseI[], incomes: IncomeI[]) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, "year");
  const timeDependenceIncomes = getDataFromTimeRange(incomes, "year");

  const arrayOfExpensesValuesSortedByMonths = sortDataByMonths(
    timeDependenceExpenses
  );
  const arrayOfIncomeValuesSortedByMonths = sortDataByMonths(
    timeDependenceIncomes
  );

  const data = generateBarData(
    arrayOfExpensesValuesSortedByMonths,
    arrayOfIncomeValuesSortedByMonths,
    "year"
  );

  return data;
};

const sortDataByMonths = <T extends { date: number; value: number }>(
  data: T[]
) => {
  const sortedData = monthsLabels.map((el, i) => {
    const monthData: T[] = data.filter((el) => getMonth(el.date) === i);

    const sumOfValue = monthData.reduce((acc, element) => {
      acc += element.value;

      return acc;
    }, 0);

    return sumOfValue;
  });

  return sortedData;
};

export {
  getWeekComparisonData,
  getMonthComparisonData,
  getYearComparisonData,
  sortDataByDays,
};
