import {
  generatePieData,
  getChartsDataFromCategories,
  getDataFromTimeRange,
} from "./utils";

import { TimeRangeProps } from "types/chart.interface";
import { ExpenseI } from "types/user.interface";

import { expensesCategories } from "@/constants/categories";

const getExpensesChartData = (
  expenses: ExpenseI[],
  timeRange: TimeRangeProps = "month"
) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, timeRange);

  const chartDataFromExpenses = getChartsDataFromCategories(
    timeDependenceExpenses,
    expensesCategories
  );

  const chartData = generatePieData(chartDataFromExpenses);

  return chartData;
};

// const getChartsDataFromExpenses = (expenses: ExpenseI[]) => {
//   const chartData = expensesCategories.reduce((accumulator, category) => {
//     // Filter expenses having that category
//     const filteredExpenses = expenses.filter(
//       (expense) => expense.category === category.value
//     );

//     // Accumulate expenses
//     const accumulateCategoryValue = filteredExpenses.reduce(
//       (acc, expense) => acc + expense.value,
//       0
//     );

//     return [
//       ...accumulator,
//       { name: category.label, value: accumulateCategoryValue },
//     ];
//   }, [] as { name: string; value: number }[]);

//   return chartData;
// };

export { getExpensesChartData };
