import { useData } from "@/context/UserDataContext";

import { getExpensesChartData } from "utils/charts/expenses";
import { getIncomeChartData } from "utils/charts/income";
import { getMonthComparisonData } from "utils/charts/comparison";
import { getSummaryChartData } from "utils/charts/summary";
import { getSumOfValuesFromTimeRange } from "utils/charts/utils";

import Chart from "chart.js/auto";

import styles from "../styles.module.scss";
import BarChart from "@/Atoms/Charts/BarChart";
import MoneyCards from "@/Molecules/MoneyCards";
import ChartPieCluster from "@/Molecules/ChartPieCluster";

Chart;

function DashboardStatisticsMonthly() {
  const { userData } = useData();

  const chartsData = {
    expenses: getExpensesChartData(userData.expenses, "month"),
    income: getIncomeChartData(userData.income, "month"),
    comparison: getMonthComparisonData(userData.expenses, userData.income),
    summary: getSummaryChartData(userData.expenses, userData.income, "month"),
  };

  const cardsData = {
    expensesValue: getSumOfValuesFromTimeRange(userData.expenses, "month"),
    incomeValue: getSumOfValuesFromTimeRange(userData.income, "month"),
  };

  return (
    <>
      <div className={styles["charts"]}>
        <MoneyCards cardsData={cardsData} timeRange="month" />
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <BarChart
            title="Comparison Expenses / Income"
            chartData={chartsData.comparison}
          />
        </div>
        <ChartPieCluster chartsData={chartsData} timeRange="month" />
      </div>
    </>
  );
}

export default DashboardStatisticsMonthly;
