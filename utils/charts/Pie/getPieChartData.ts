import { getChartsDataFromCategories, getChartsDataFromCrypto } from "../utils";

import { TimeRangeProps } from "types/chart.interface";

import { generatePieData } from "../generateChartsData";
import {
  getDataFromTimePeriod,
  getPayoutDataFromTimePeriod,
} from "utils/timeFunctions";
import { cryptoSelects } from "@/constants/cryptoSelects";

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

const getInvestmentsPieChartData = <
  T extends { name: string; payoutDate: number; summary: number }
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

  const chartDataFromExpenses = getChartsDataFromCrypto(
    timeDependenceExpenses,
    cryptoSelects
  );

  const chartData = generatePieData(chartDataFromExpenses);

  return chartData;
};

export { getPieChartData, getInvestmentsPieChartData };
