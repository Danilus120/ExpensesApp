import { getDaysInMonth } from "date-fns";

import { TimeRangeProps } from "types/chart.interface";

import { daysLabels, monthsLabels } from "@/constants/chartsConstants";
import { chartColors } from "@/constants/colors";

// Bar
const generateBarDataByCategories = (
  chartDataByCategories: {
    name: string;
    value: number;
  }[]
) => {
  const data = {
    labels: chartDataByCategories.map((data) => data.name),
    datasets: [
      {
        label: "Value",
        data: chartDataByCategories.map((el) => el.value),
        backgroundColor: chartColors,
        backdropColor: "#fff",
      },
    ],
  };

  return data;
};

const generateComparisonBarData = (
  expensesData: number[],
  incomesData: number[],
  timeRange: TimeRangeProps
) => {
  const labels = generateLabels(timeRange);

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

// Line
const generateLineData = (
  expensesData: number[],
  incomesData: number[],
  timeRange: TimeRangeProps
) => {
  const labels = generateLabels(timeRange);

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: expensesData,
        borderColor: "rgb(232, 120, 120)",
        backgroundColor: "rgba(232, 120, 120, 0.5)",
      },
      {
        label: "Income",
        data: incomesData,
        borderColor: "rgb(92, 217, 122)",
        backgroundColor: "rgba(92, 217, 122, 0.5)",
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

const generateLabels = (timeRange: TimeRangeProps) => {
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

  return labels;
};

export {
  generateBarDataByCategories,
  generateComparisonBarData,
  generateLineData,
  generatePieData,
};
