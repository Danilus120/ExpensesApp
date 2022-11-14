import { getChartsDataFromCategories } from "../utils";

import { TimeRangeProps } from "types/chart.interface";
import { IncomeI } from "types/user.interface";
import { incomeCategories } from "@/constants/categories";
import { generatePieData } from "../generateChartsData";
import { getDataFromTimePeriod } from "utils/timeFunctions";

const getIncomeChartData = (
  incomes: IncomeI[],
  timeRange: TimeRangeProps = "month",
  chosenDate: Date | number = new Date()
) => {
  const timeDependenceIncomes = getDataFromTimePeriod(
    incomes,
    timeRange,
    chosenDate
  );

  const chartDataFromIncomes = getChartsDataFromCategories(
    timeDependenceIncomes,
    incomeCategories
  );

  const chartData = generatePieData(chartDataFromIncomes);

  return chartData;
};

export { getIncomeChartData };
