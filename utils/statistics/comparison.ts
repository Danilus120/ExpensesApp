import { addMonths } from "date-fns";
import { UserFirebaseI } from "types/user.interface";
import { getValueOfDataFromTimePeriod } from "utils/timeFunctions";

const calculateComparisonPercent = (
  firstValue: number,
  secondValue: number
) => {
  return (((firstValue - secondValue) / secondValue) * 100).toFixed(2);
};

const getDashboardComparisonData = (
  data: UserFirebaseI,
  chosenDate: Date | number = new Date()
) => {
  const { expenses, income, investments } = data;

  const pastMonthDate = addMonths(chosenDate, -1);

  const pastMonthValues = {
    expenses: getValueOfDataFromTimePeriod(expenses, "month", pastMonthDate),
    income: getValueOfDataFromTimePeriod(income, "month", pastMonthDate),
    investments: getValueOfDataFromTimePeriod(
      investments,
      "month",
      pastMonthDate
    ),
  };

  const todayValues = {
    expenses: getValueOfDataFromTimePeriod(expenses, "month", chosenDate),
    income: getValueOfDataFromTimePeriod(income, "month", chosenDate),
    investments: getValueOfDataFromTimePeriod(investments, "month", chosenDate),
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

export { calculateComparisonPercent, getDashboardComparisonData };
