import { addMonths } from "date-fns";
import {
  getSummaryValueFromTimePeriod,
  getValueOfDataFromTimePeriod,
} from "utils/timeFunctions";

const generateMonthOptionsForSelect = (data: {
  expenses: { date: number; value: number }[];
  income: { date: number; value: number }[];
  investments: { date: number; summary: number; withdrawn: boolean }[];
}) => {
  let actualDate = new Date();
  const options: { label: string; value: number }[] = [];

  for (let i = 0; i < 12; i++) {
    const dataFromMonth = calculateSavingsFromOneMonth(data, actualDate);

    console.log(dataFromMonth);

    if (dataFromMonth > 0) {
      options.push({
        label: `${i + 1} months`,
        value: i + 1,
      });
    }

    actualDate = addMonths(actualDate, -1);
  }

  return options;
};

const calculateAvgSavingsFromLastMonths = (
  valueToSave: number,
  data: {
    expenses: { date: number; value: number }[];
    income: { date: number; value: number }[];
    investments: { date: number; summary: number; withdrawn: boolean }[];
  },
  months: number
) => {
  let actualDate = new Date();
  let sum = 0;

  for (let i = 0; i < months; i++) {
    const dataFromMonth = calculateSavingsFromOneMonth(data, actualDate);

    actualDate = addMonths(actualDate, -1);

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

export {
  calculateAvgSavingsFromLastMonths,
  calculateSavingsFromOneMonth,
  generateMonthOptionsForSelect,
};
