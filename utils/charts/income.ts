import {
  generatePieData,
  getChartsDataFromCategories,
  getDataFromTimeRange,
  getUniqueTitlesOfIncomes,
} from "./utils";

import { TimeRangeProps } from "types/chart.interface";
import { IncomeI } from "types/user.interface";
import { incomeCategories } from "@/constants/categories";

const getIncomeChartData = (
  incomes: IncomeI[],
  timeRange: TimeRangeProps = "month"
) => {
  const timeDependenceIncomes = getDataFromTimeRange(incomes, timeRange);

  const chartDataFromIncomes = getChartsDataFromCategories(
    timeDependenceIncomes,
    incomeCategories
  );

  const chartData = generatePieData(chartDataFromIncomes);

  return chartData;
};

export { getIncomeChartData };
