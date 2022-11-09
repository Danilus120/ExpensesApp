import { categories } from "@/constants/categories";
import { daysLabels, monthsLabels } from "@/constants/chartsConstants";
import { chartColors } from "@/constants/colors";
import {
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  isSameMonth,
  isSameWeek,
  isSameYear,
} from "date-fns";
import { ExpenseI, IncomeI } from "types/user.interface";

type TimeRangeProps = "week" | "month" | "year";

// Week

const getWeekComparisonData = (expenses: ExpenseI[], incomes: IncomeI[]) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, "week");
  const timeDependenceIncomes = getDataFromTimeRange(incomes, "week");

  const arrayOfExpensesValuesSortedByDays = sortDataByWeekDays(
    timeDependenceExpenses
  );
  const arrayOfIncomeValuesSortedByDays = sortDataByWeekDays(
    timeDependenceIncomes
  );

  const data = generateBarData(
    arrayOfExpensesValuesSortedByDays,
    arrayOfIncomeValuesSortedByDays,
    "week"
  );

  return data;
};

const sortDataByWeekDays = <T extends { date: number; value: number }>(
  data: T[]
) => {
  const sortedData = daysLabels.map((el, i) => {
    const weekdayData = data.filter((el) => {
      return getDay(el.date) - 1 === i && isSameWeek(el.date, new Date());
    });

    const sumOfValue = weekdayData.reduce((acc, element) => {
      acc += element.value;

      return acc;
    }, 0);

    return sumOfValue;
  });

  return sortedData;
};

// Month

const getMonthComparisonData = (expenses: ExpenseI[], incomes: IncomeI[]) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, "month");
  const timeDependenceIncomes = getDataFromTimeRange(incomes, "month");

  const arrayOfExpensesValuesSortedByMonths = sortDataByDays(
    timeDependenceExpenses
  );
  const arrayOfIncomeValuesSortedByMonths = sortDataByDays(
    timeDependenceIncomes
  );

  const data = generateBarData(
    arrayOfExpensesValuesSortedByMonths,
    arrayOfIncomeValuesSortedByMonths,
    "month"
  );

  return data;
};

const sortDataByDays = <T extends { date: number; value: number }>(
  data: T[]
) => {
  const daysInMonth = getDaysInMonth(new Date());

  const sortedData = Array(daysInMonth)
    .fill(0)
    .map((el, i) => {
      const dayData: T[] = data.filter((el) => getDate(el.date) === i);

      const sumOfValue = dayData.reduce((acc, element) => {
        acc += element.value;

        return acc;
      }, 0);

      return sumOfValue;
    });

  return sortedData;
};

// Year

const getYearComparisonData = (expenses: ExpenseI[], incomes: IncomeI[]) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, "year");
  const timeDependenceIncomes = getDataFromTimeRange(incomes, "year");

  const arrayOfExpensesValuesSortedByMonths = sortDataByMonths(
    timeDependenceExpenses
  );
  const arrayOfIncomeValuesSortedByMonths = sortDataByMonths(
    timeDependenceIncomes
  );

  const data = generateBarData(
    arrayOfExpensesValuesSortedByMonths,
    arrayOfIncomeValuesSortedByMonths,
    "year"
  );

  return data;
};

const sortDataByMonths = <T extends { date: number; value: number }>(
  data: T[]
) => {
  const sortedData = monthsLabels.map((el, i) => {
    const monthData: T[] = data.filter((el) => getMonth(el.date) === i);

    const sumOfValue = monthData.reduce((acc, element) => {
      acc += element.value;

      return acc;
    }, 0);

    return sumOfValue;
  });

  return sortedData;
};

// Bar

const generateBarData = (
  expensesData: number[],
  incomesData: number[],
  timeRange: TimeRangeProps
) => {
  let labels = monthsLabels;

  switch (timeRange) {
    case "week":
      labels = daysLabels;
      break;
    case "month":
      labels = Array(getDaysInMonth(new Date()))
        .fill(0)
        .map((el, i) => String(i));
      break;
    case "year":
      labels = monthsLabels;
      break;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: expensesData,
        backgroundColor: "#e87a7a",
        backdropColor: "#fff",
      },
      {
        label: "Incomes",
        data: incomesData,
        backgroundColor: "#5cd97a",
        backdropColor: "#fff",
      },
    ],
  };

  return data;
};

// Pie

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

const getSumOfValuesFromTimeRange = <T extends { date: number; value: number }>(
  data: T[],
  timeRange: TimeRangeProps
) => {
  const sum = getDataFromTimeRange(data, timeRange).reduce((acc, el) => {
    return acc + el.value;
  }, 0);

  return sum;
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

const getChartsDataFromExpenses = (expenses: ExpenseI[]) => {
  const chartData = categories.reduce((accumulator, category) => {
    // Filter expenses having that category
    const filteredExpenses = expenses.filter(
      (expense) => expense.category === category.value
    );

    // Accumulate expenses
    const accumulateCategoryValue = filteredExpenses.reduce(
      (acc, expense) => acc + expense.value,
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
  getMonthComparisonData,
  getWeekComparisonData,
  getChartsDataFromExpenses,
  getChartsDataFromIncomes,
  getExpensesChartData,
  getIncomeChartData,
  getSumOfValuesFromTimeRange,
  getDataFromTimeRange,
};
