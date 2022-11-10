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

// const getChartsDataFromIncomes = (incomes: IncomeI[]) => {
//   // Get unique title of incomes

//   const chartData = incomeCategories.reduce((accumulator, category) => {
//     // Filter expenses having that category
//     const filteredExpenses = incomes.filter(
//       (income) => income.category === category.value
//     );

//     // Accumulate expenses
//     const accumulateCategoryValue = filteredExpenses.reduce(
//       (acc, income) => acc + income.value,
//       0
//     );

//     return [
//       ...accumulator,
//       { name: category.label, value: accumulateCategoryValue },
//     ];
//   }, [] as { name: string; value: number }[]);

//   return chartData;
// };

export { getIncomeChartData };
