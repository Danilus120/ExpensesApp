import { addMonths } from "date-fns";
import { UserFirebaseI } from "types/user.interface";
import {
  getSummaryValueFromTimePeriod,
  getValueOfDataFromTimePeriod,
} from "utils/timeFunctions";

const calculateAvgSavingsFromLastMonths = (
  valueToSave: number,
  data: {
    expenses: { date: number; value: number }[];
    income: { date: number; value: number }[];
    investments: { date: number; summary: number; withdrawn: boolean }[];
  },
  months: number
) => {
  const date = new Date();
  let sum = 0;

  for (let i = 0; i < months; i++) {
    const dataFromMonth = calculateSavingsFromOneMonth(
      data,
      addMonths(date, -i)
    );

    sum += dataFromMonth;
  }

  return Number((valueToSave / (sum / months)).toFixed(2));
};

const calculateSavingsFromOneMonth = (
  data: {
    expenses: { date: number; value: number }[];
    income: { date: number; value: number }[];
    investments: { date: number; summary: number; withdrawn: boolean }[];
  },
  date: number | Date
) => {
  const expensesValue = getValueOfDataFromTimePeriod(
    data.expenses,
    "month",
    date
  );
  const incomeValue = getValueOfDataFromTimePeriod(data.income, "month", date);
  const investmentsValue = getSummaryValueFromTimePeriod(
    data.investments.filter((investment) => investment.withdrawn),
    "month",
    date
  );

  return incomeValue + investmentsValue - expensesValue;
};

export { calculateAvgSavingsFromLastMonths, calculateSavingsFromOneMonth };
