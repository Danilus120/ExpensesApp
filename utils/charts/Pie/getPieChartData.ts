import { getChartsDataFromCategories } from "../utils";

import { TimeRangeProps } from "types/chart.interface";

import { generatePieData } from "../generateChartsData";
import { getDataFromTimePeriod } from "utils/timeFunctions";

const getPieChartData = <
  T extends { date: number; value: number; category: string }
>(
  data: T[],
  timeRange: TimeRangeProps = "month",
  categories: { label: string; value: string; allowedInSelect: boolean }[],
  chosenDate: Date | number = new Date()
) => {
  const timeDependenceExpenses = getDataFromTimePeriod(
    data,
    timeRange,
    chosenDate
  );

  const chartDataFromExpenses = getChartsDataFromCategories(
    timeDependenceExpenses,
    categories
  );

  const chartData = generatePieData(chartDataFromExpenses);

  return chartData;
};

export { getPieChartData };
