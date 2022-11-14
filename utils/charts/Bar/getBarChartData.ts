import { TimeRangeProps } from "types/chart.interface";
import { getDataFromTimePeriod } from "utils/timeFunctions";
import { generateBarDataByCategories } from "../generateChartsData";
import { getChartsDataFromCategories } from "../utils";

const getBarChartData = <
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

  const chartDataByCategories = getChartsDataFromCategories(
    timeDependenceExpenses,
    categories
  );

  const chartData = generateBarDataByCategories(chartDataByCategories);

  return chartData;
};

export { getBarChartData };
