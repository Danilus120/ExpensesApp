import { generatePieData, getDataFromTimeRange } from "./utils";

import { TimeRangeProps } from "types/chart.interface";
import { ExpenseI, IncomeI } from "types/user.interface";

const getSummaryChartData = (
  expenses: ExpenseI[],
  incomes: IncomeI[],
  timeRange: TimeRangeProps
) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, timeRange);
  const timeDependenceIncomes = getDataFromTimeRange(incomes, timeRange);

  const chartDataFromIncomes = getChartsDataByExpensesAndIncome(
    timeDependenceExpenses,
    timeDependenceIncomes
  );

  const chartData = generatePieData(chartDataFromIncomes);

  return chartData;
};

const getChartsDataByExpensesAndIncome = (
  expenses: ExpenseI[],
  income: IncomeI[]
) => {
  const sumOfExpensesValues = expenses.reduce((acc, curr) => {
    return acc + curr.value;
  }, 0);

  const sumOfIncomeValues = income.reduce((acc, curr) => {
    return acc + curr.value;
  }, 0);

  return [
    { name: "Expenses", value: sumOfExpensesValues },
    { name: "Income", value: sumOfIncomeValues },
  ];
};

export { getSummaryChartData };
