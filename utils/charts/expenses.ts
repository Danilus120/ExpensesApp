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

export { getExpensesChartData };
