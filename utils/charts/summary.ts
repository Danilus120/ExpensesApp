import { generatePieData, getSumOfValuesFromTimeRange } from "./utils";

import { TimeRangeProps } from "types/chart.interface";
import { ExpenseI, IncomeI } from "types/user.interface";

const getSummaryChartData = (
  expenses: ExpenseI[],
  income: IncomeI[],
  timeRange: TimeRangeProps
) => {
  const sumOfExpensesFromTimeRange = getSumOfValuesFromTimeRange(
    expenses,
    timeRange
  );
  const sumOfIncomesFromTimeRange = getSumOfValuesFromTimeRange(
    income,
    timeRange
  );

  const chartDataFromSumOfSummary = [
    { name: "Expenses", value: sumOfExpensesFromTimeRange },
    { name: "Income", value: sumOfIncomesFromTimeRange },
  ];

  const chartData = generatePieData(chartDataFromSumOfSummary);

  return chartData;
};

export { getSummaryChartData };
