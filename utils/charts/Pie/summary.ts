import { TimeRangeProps } from "types/chart.interface";
import { ExpenseI, IncomeI } from "types/user.interface";
import { getValueOfDataFromTimePeriod } from "utils/timeFunctions";
import { generatePieData } from "../generateChartsData";

const getSummaryChartData = (
  expenses: ExpenseI[],
  income: IncomeI[],
  timeRange: TimeRangeProps,
  chosenDate: Date | number = new Date()
) => {
  const sumOfExpensesFromTimeRange = getValueOfDataFromTimePeriod(
    expenses,
    timeRange,
    chosenDate
  );
  const sumOfIncomesFromTimeRange = getValueOfDataFromTimePeriod(
    income,
    timeRange,
    chosenDate
  );

  const chartDataFromSumOfSummary = [
    { name: "Expenses", value: sumOfExpensesFromTimeRange },
    { name: "Income", value: sumOfIncomesFromTimeRange },
  ];

  const chartData = generatePieData(chartDataFromSumOfSummary);

  return chartData;
};

export { getSummaryChartData };
