import { categories } from "@/constants/categories";
import { monthsLabels } from "@/constants/chartsConstants";
import { chartColors } from "@/constants/colors";
import { isSameMonth, isSameWeek, isSameYear } from "date-fns";
import { ExpenseI, IncomeI } from "types/user.interface";

type TimeRangeProps = "week" | "month" | "year";

const getYearComparisonData = (expenses: ExpenseI[], incomes: IncomeI[]) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, "year");
  const timeDependenceIncomes = getDataFromTimeRange(incomes, "year");

  // Generate array of numbers (12) from expenses / incomes (ex. [120, 145, 487, 484, 452, 266, 254, 877, 933, 874, 120, 320])

  const arrayOfExpensesValuesSortedBymonths = sortExpensesDataByMonths(
    timeDependenceExpenses
  );
  const arrayOfIncomeValuesSortedBymonths = sortIncomeDataByMonths(
    timeDependenceIncomes
  );

  const data = generateBarData(
    arrayOfExpensesValuesSortedBymonths,
    arrayOfIncomeValuesSortedBymonths
  );

  return data;
};

// TODO: standarive values forms (price / income to VALUE)
const sortExpensesDataByMonths = <T extends { date: number; price: number }>(
  data: T[]
) => {
  const sortedData = monthsLabels.map((el, i) => {
    const monthData = data.filter((el) => new Date(el.date).getMonth() === i);

    const sumOfValue = monthData.reduce((acc, element) => {
      acc += element.price;

      return acc;
    }, 0);

    return sumOfValue;
  });

  return sortedData;
};

const sortIncomeDataByMonths = <T extends { date: number; income: number }>(
  data: T[]
) => {
  const sortedData = monthsLabels.map((el, i) => {
    const monthData = data.filter((el) => new Date(el.date).getMonth() === i);

    const sumOfValue = monthData.reduce((acc, element) => {
      acc += element.income;

      return acc;
    }, 0);

    return sumOfValue;
  });

  return sortedData;
};

const generateBarData = (expensesData: number[], incomesData: number[]) => {
  const data = {
    labels: monthsLabels,
    datasets: [
      {
        label: "Expenses",
        data: expensesData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Incomes",
        data: incomesData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return data;
};

const getExpensesChartData = (
  expenses: ExpenseI[],
  timeRange: TimeRangeProps = "month"
) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, timeRange);

  const chartDataFromExpenses = getChartsDataFromExpenses(
    timeDependenceExpenses
  );

  const chartData = generatePieData(chartDataFromExpenses);

  return chartData;
};

const getIncomeChartData = (
  incomes: IncomeI[],
  timeRange: TimeRangeProps = "month"
) => {
  const timeDependenceIncomes = getDataFromTimeRange(incomes, timeRange);

  const chartDataFromIncomes = getChartsDataFromIncomes(timeDependenceIncomes);

  const chartData = generatePieData(chartDataFromIncomes);

  return chartData;
};

const generatePieData = (
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
  getYearComparisonData,
  getChartsDataFromExpenses,
  getChartsDataFromIncomes,
  getExpensesChartData,
  getIncomeChartData,
};
