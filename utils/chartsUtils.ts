import { categories } from "@/constants/categories";
import { chartColors } from "@/constants/colors";
import { isSameMonth, isSameWeek, isSameYear } from "date-fns";
import { ExpenseI, IncomeI } from "types/user.interface";

type TimeRangeProps = "week" | "month" | "year";

const getExpensesChartData = (
  expenses: ExpenseI[],
  timeRange: TimeRangeProps = "month"
) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, timeRange);

  const chartDataFromExpenses = getChartsDataFromExpenses(
    timeDependenceExpenses
  );

  const chartData = generateChartData(chartDataFromExpenses);

  return chartData;
};

const getIncomeChartData = (
  incomes: IncomeI[],
  timeRange: TimeRangeProps = "month"
) => {
  const timeDependenceIncomes = getDataFromTimeRange(incomes, timeRange);

  const chartDataFromIncomes = getChartsDataFromIncomes(timeDependenceIncomes);

  const chartData = generateChartData(chartDataFromIncomes);

  return chartData;
};

const generateChartData = (
  data: { name: string; value: number }[],
  label: string = "Title"
) => {
  const colors = data.map((el, i) => chartColors[i]);

  const chartData = {
    labels: data.map((el) => el.name),
    datasets: [
      {
        label: label,
        data: data.map((el) => el.value),
        color: "#fff",
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return chartData;
};

const getDataFromTimeRange = <T extends { date: number }>(
  data: T[],
  timeRange: TimeRangeProps
): T[] => {
  let timeDependenceData = [] as T[];

  switch (timeRange) {
    case "week":
      timeDependenceData = data.filter((el) => isSameWeek(el.date, new Date()));
      break;
    case "month":
      timeDependenceData = data.filter((el) =>
        isSameMonth(el.date, new Date())
      );
      break;
    case "year":
      timeDependenceData = data.filter((el) => isSameYear(el.date, new Date()));
      break;
    default:
      timeDependenceData = data;
      break;
  }

  return timeDependenceData;
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
      (acc, income) => acc + Number(income.income),
      0
    );

    return [
      ...accumulator,
      { name: category.label, value: accumulateCategoryValue },
    ];
  }, [] as { name: string; value: number }[]);

  return chartData;
};

const getChartsDataFromExpenses = (expenses: ExpenseI[]) => {
  const chartData = categories.reduce((accumulator, category) => {
    // Filter expenses having that category
    const filteredExpenses = expenses.filter(
      (expense) => expense.category === category.value
    );

    // Accumulate expenses
    const accumulateCategoryValue = filteredExpenses.reduce(
      (acc, expense) => acc + Number(expense.price),
      0
    );

    return [
      ...accumulator,
      { name: category.label, value: accumulateCategoryValue },
    ];
  }, [] as { name: string; value: number }[]);

  return chartData;
};

const getUniqueTitlesOfIncomes = (incomes: IncomeI[]) => {
  const uniqueIncomeTitles = Array.from(
    new Set(incomes.map((incomes) => incomes.title))
  );

  const formattedUniqueIncomeTitles = uniqueIncomeTitles.map((uniqueIncome) => {
    return {
      label: uniqueIncome,
    };
  });

  return formattedUniqueIncomeTitles;
};

export {
  getChartsDataFromExpenses,
  getChartsDataFromIncomes,
  getExpensesChartData,
  getIncomeChartData,
};
