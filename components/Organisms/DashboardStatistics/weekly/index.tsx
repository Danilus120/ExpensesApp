import { useData } from "@/context/UserDataContext";

import {
  getExpensesChartData,
  getIncomeChartData,
  getSumOfValuesFromTimeRange,
  getWeekComparisonData,
} from "utils/chartsUtils";

import Chart from "chart.js/auto";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";
import BarChart from "@/Atoms/Charts/BarChart";
import PieChart from "@/Atoms/Charts/PieChart";
import MoneyCards from "@/Molecules/MoneyCards";
import ChartPieCluster from "@/Molecules/ChartPieCluster";

Chart;

function DashboardStatisticsWeekly() {
  const { userData } = useData();

  const chartsData = {
    expenses: getExpensesChartData(userData.expenses, "week"),
    income: getIncomeChartData(userData.income, "week"),
    comparison: getWeekComparisonData(userData.expenses, userData.income),
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
