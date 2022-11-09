import {
  generatePieData,
  getDataFromTimeRange,
  getUniqueTitlesOfIncomes,
} from "./utils";

import { TimeRangeProps } from "types/chart.interface";
import { IncomeI } from "types/user.interface";

const getIncomeChartData = (
  incomes: IncomeI[],
  timeRange: TimeRangeProps = "month"
) => {
  const timeDependenceIncomes = getDataFromTimeRange(incomes, timeRange);

  const chartDataFromIncomes = getChartsDataFromIncomes(timeDependenceIncomes);

  const chartData = generatePieData(chartDataFromIncomes);

  return chartData;
};

const getChartsDataFromIncomes = (incomes: IncomeI[]) => {
  // Get unique title of incomes
  const incomeTitles = getUniqueTitlesOfIncomes(incomes);

  const chartData = incomeTitles.reduce((accumulator, category) => {
    // Filter expenses having that category
    const filteredExpenses = incomes.filter(
      (income) => income.title === category.label
    );

    // Accumulate expenses
    const accumulateCategoryValue = filteredExpenses.reduce(
      (acc, income) => acc + income.value,
      0
    );

    return [
      ...accumulator,
      { name: category.label, value: accumulateCategoryValue },
    ];
  }, [] as { name: string; value: number }[]);

  return chartData;
};

export { getIncomeChartData };
