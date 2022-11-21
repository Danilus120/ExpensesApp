import { cryptoSelects } from "@/constants/cryptoSelects";
import { TimeRangeProps } from "types/chart.interface";
import {
  getDataFromTimePeriod,
  getPayoutDataFromTimePeriod,
} from "utils/timeFunctions";
import { generateBarDataByCategories } from "../generateChartsData";
import { getChartsDataFromCategories, getChartsDataFromCrypto } from "../utils";

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

const getInvestmentsBarChartData = <
  T extends { payoutDate: number; summary: number; name: string }
>(
  data: T[],
  timeRange: TimeRangeProps = "month",
  chosenDate: Date | number = new Date()
) => {
  const timeDependenceExpenses = getPayoutDataFromTimePeriod(
    data,
    timeRange,
    chosenDate
  );

  const chartDataByCategories = getChartsDataFromCrypto(
    timeDependenceExpenses,
    cryptoSelects
  );

  const chartData = generateBarDataByCategories(chartDataByCategories);

  return chartData;
};

export { getBarChartData, getInvestmentsBarChartData };
