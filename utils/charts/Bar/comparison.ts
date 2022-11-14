import {
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  isSameWeek,
} from "date-fns";

import { ExpenseI, IncomeI } from "types/user.interface";

import { daysLabels, monthsLabels } from "@/constants/chartsConstants";
import { getDataFromTimePeriod } from "utils/timeFunctions";
import { generateComparisonBarData } from "../generateChartsData";

// Week
const getWeekComparisonData = (
  expenses: ExpenseI[],
  incomes: IncomeI[],
  chosenDate: Date | number = new Date()
) => {
  const timeDependenceExpenses = getDataFromTimePeriod(
    expenses,
    "week",
    chosenDate
  );
  const timeDependenceIncomes = getDataFromTimePeriod(
    incomes,
    "week",
    chosenDate
  );

  const arrayOfExpensesValuesSortedByDays = sortDataByWeekDays(
    timeDependenceExpenses
  );
  const arrayOfIncomeValuesSortedByDays = sortDataByWeekDays(
    timeDependenceIncomes
  );

  const data = generateComparisonBarData(
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
    const weekdayData: T[] = data.filter((el) => {
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
const getMonthComparisonData = (
  expenses: ExpenseI[],
  incomes: IncomeI[],
  chosenDate: Date | number = new Date()
) => {
  const timeDependenceExpenses = getDataFromTimePeriod(
    expenses,
    "month",
    chosenDate
  );
  const timeDependenceIncomes = getDataFromTimePeriod(
    incomes,
    "month",
    chosenDate
  );

  const arrayOfExpensesValuesSortedByMonths = sortDataByDays(
    timeDependenceExpenses
  );
  const arrayOfIncomeValuesSortedByMonths = sortDataByDays(
    timeDependenceIncomes
  );

  const data = generateComparisonBarData(
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
const getYearComparisonData = (
  expenses: ExpenseI[],
  incomes: IncomeI[],
  chosenDate: Date | number = new Date()
) => {
  const timeDependenceExpenses = getDataFromTimePeriod(
    expenses,
    "year",
    chosenDate
  );
  const timeDependenceIncomes = getDataFromTimePeriod(
    incomes,
    "year",
    chosenDate
  );

  const arrayOfExpensesValuesSortedByMonths = sortDataByMonths(
    timeDependenceExpenses
  );
  const arrayOfIncomeValuesSortedByMonths = sortDataByMonths(
    timeDependenceIncomes
  );

  const data = generateComparisonBarData(
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
