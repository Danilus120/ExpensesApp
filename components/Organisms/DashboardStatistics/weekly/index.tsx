import { useData } from "@/context/UserDataContext";

import { getExpensesChartData } from "utils/charts/expenses";
import { getIncomeChartData } from "utils/charts/income";
import { getWeekComparisonData } from "utils/charts/comparison";
import { getSummaryChartData } from "utils/charts/summary";
import { getSumOfValuesFromTimeRange } from "utils/charts/utils";

import Chart from "chart.js/auto";

import styles from "../styles.module.scss";
import BarChart from "@/Atoms/Charts/BarChart";
import MoneyCards from "@/Molecules/MoneyCards";
import ChartPieCluster from "@/Molecules/ChartPieCluster";

Chart;

function DashboardStatisticsWeekly() {
  const { userData } = useData();

  const chartsData = {
    expenses: getExpensesChartData(userData.expenses, "week"),
    income: getIncomeChartData(userData.income, "week"),
    comparison: getWeekComparisonData(userData.expenses, userData.income),
    summary: getSummaryChartData(userData.expenses, userData.income, "week"),
  };

  const cardsData = {
    expensesValue: getSumOfValuesFromTimeRange(userData.expenses, "week"),
    incomeValue: getSumOfValuesFromTimeRange(userData.income, "week"),
  };

  return (
    <>
      <div className={styles["charts"]}>
        <MoneyCards cardsData={cardsData} timeRange="week" />
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <BarChart
            title="Comparison Expenses / Income"
            chartData={chartsData.comparison}
          />
        </div>
        <ChartPieCluster chartsData={chartsData} timeRange="week" />
      </div>
    </>
  );
}

export default DashboardStatisticsWeekly;
