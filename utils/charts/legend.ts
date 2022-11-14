import { chartColors } from "@/constants/colors";
import { TimeRangeProps } from "types/chart.interface";
import { getChartsDataFromCategories, getDataFromTimeRange } from "./utils";

const generateLegendListFromTimeRange = (
  data: any,
  categories: { label: string; value: string; allowedInSelect: boolean }[],
  timeRange: TimeRangeProps,
  sorted: boolean
) => {
  const dataFromTimeRange: { date: number; value: number; category: string }[] =
    getDataFromTimeRange(data, timeRange);

  let sortedDataByCategories = getChartsDataFromCategories(
    dataFromTimeRange,
    categories
  );

  if (sorted) {
    sortedDataByCategories = sortedDataByCategories.sort(
      (a, b) => b.value - a.value
    );
  }

  return sortedDataByCategories;
};

const generatePieChartLegendData = <
  T extends { datasets: { data: Array<number> }[]; labels: Array<string> }
>(
  chartData: T,
  sort: boolean = false
) => {
  const { labels, datasets } = chartData;
  const { data } = datasets[0];

  const summaryOfDataValues = data.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  let pieChartLegendData = labels
    .map((label, i) => {
      return {
        label: label,
        value: data[i],
        percent: Math.round((data[i] / summaryOfDataValues) * 100) + "%",
        color: chartColors[i],
      };
    })
    .filter((data) => data.value != 0);

  if (sort) {
    pieChartLegendData = pieChartLegendData.sort((a, b) => b.value - a.value);
  }

  return pieChartLegendData;
};

export { generatePieChartLegendData, generateLegendListFromTimeRange };
