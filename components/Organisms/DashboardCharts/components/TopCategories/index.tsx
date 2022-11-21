import BarChartWithLegend from "@/Atoms/Charts/BarChartWithLegend";
import { expensesCategories, incomeCategories } from "@/constants/categories";
import { useData } from "@/context/UserDataContext";
import { getPieChartData } from "utils/charts/Pie/getPieChartData";
import { generatePieChartLegendData } from "utils/charts/Pie/legend";
import { TimeRangeProps } from "types/chart.interface";

import styles from "./styles.module.scss";

interface TopCategoriesProps {
  timeRange: TimeRangeProps;
  chosenDate: Date;
}

function TopCategories({ timeRange, chosenDate }: TopCategoriesProps) {
  const { userData } = useData();

  const chartsData = {
    expenses: getPieChartData(
      userData.expenses,
      timeRange,
      expensesCategories,
      chosenDate
    ),
    income: getPieChartData(
      userData.income,
      timeRange,
      incomeCategories,
      chosenDate
    ),
  };

  const legends = {
    expenses: generatePieChartLegendData(chartsData.expenses, { sort: "dsc" }),
    income: generatePieChartLegendData(chartsData.income, { sort: "dsc" }),
  };

  return (
    <div className={styles["top-categories"]}>
      <BarChartWithLegend
        chartData={chartsData.expenses}
        legend={legends.expenses}
        timeRange={timeRange}
      />
      <BarChartWithLegend
        chartData={chartsData.income}
        legend={legends.income}
        timeRange={timeRange}
      />
    </div>
  );
}

export default TopCategories;
