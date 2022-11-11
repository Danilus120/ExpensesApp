import { addMonths, isSameMonth } from "date-fns";
import { UserFirebaseI } from "types/user.interface";
import {
  getDataFromTimeRange,
  getSumOfValuesFromTimeRange,
} from "utils/charts/utils";
const calculateComparisonPercent = (
  firstValue: number,
  secondValue: number
) => {
  const comparisonPercent = ((secondValue / firstValue) * 100 - 100).toFixed(2);
  return Number(comparisonPercent) > 0 ? comparisonPercent : -comparisonPercent;
};

const getDashboardComparisonData = (data: UserFirebaseI) => {
  const { expenses, income, investments } = data;

  const pastMonthValues = {
    expenses: getDataFromPastMonth(expenses),
    income: getDataFromPastMonth(income),
    investments: getDataFromPastMonth(investments),
  };

  const todayValues = {
    expenses: getSumOfValuesFromTimeRange(expenses, "month"),
    income: getSumOfValuesFromTimeRange(income, "month"),
    investments: getSumOfValuesFromTimeRange(investments, "month"),
  };

  const pastMonthSavings = pastMonthValues.income - pastMonthValues.expenses;
  const todaySavings = todayValues.income - todayValues.expenses;

  return {
    expenses: {
      pastMonth: pastMonthValues.expenses,
      today: todayValues.expenses,
    },
    income: {
      pastMonth: pastMonthValues.income,
      today: todayValues.income,
    },
    investments: {
      pastMonth: pastMonthValues.investments,
      today: todayValues.investments,
    },
    savings: {
      pastMonth: pastMonthSavings,
      today: todaySavings,
    },
  };
};

const getDataFromPastMonth = <T extends { value: number; date: number }>(
  data: T[]
) => {
  const pastMonthDate = addMonths(new Date(), -1);

  const pastMonthData = data.filter((el) =>
    isSameMonth(el.date, pastMonthDate)
  );

  const pastMonthValue = pastMonthData.reduce(
    (acc, currEl) => acc + currEl.value,
    0
  );

  return pastMonthValue;
};

export { calculateComparisonPercent, getDashboardComparisonData };
