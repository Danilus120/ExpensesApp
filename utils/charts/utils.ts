import { getDaysInMonth, isSameMonth, isSameWeek, isSameYear } from "date-fns";

import { TimeRangeProps } from "types/chart.interface";
import { IncomeI } from "types/user.interface";

import { daysLabels, monthsLabels } from "@/constants/chartsConstants";
import { chartColors } from "@/constants/colors";

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
        .map((el, i) => String(i + 1));
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
  generateBarData,
  generatePieData,
  getSumOfValuesFromTimeRange,
  getDataFromTimeRange,
  getUniqueTitlesOfIncomes,
};
