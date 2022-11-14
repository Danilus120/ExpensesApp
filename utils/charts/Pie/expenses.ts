import { getChartsDataFromCategories } from "../utils";

import { TimeRangeProps } from "types/chart.interface";
import { ExpenseI } from "types/user.interface";

import { expensesCategories } from "@/constants/categories";
import { generatePieData } from "../generateChartsData";
import { getDataFromTimePeriod } from "utils/timeFunctions";

const getExpensesChartData = (
  expenses: ExpenseI[],
  timeRange: TimeRangeProps = "month",
  chosenDate: Date | number = new Date()
) => {
  const timeDependenceExpenses = getDataFromTimePeriod(
    expenses,
    timeRange,
    chosenDate
  );

  const chartDataFromExpenses = getChartsDataFromCategories(
    timeDependenceExpenses,
    expensesCategories
  );

  const chartData = generatePieData(chartDataFromExpenses);

  return chartData;
};

export { getExpensesChartData };
