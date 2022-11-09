import { useData } from "@/context/UserDataContext";

import { getExpensesChartData } from "utils/charts/expenses";
import { getIncomeChartData } from "utils/charts/income";
import { getYearComparisonData } from "utils/charts/comparison";
import { getSummaryChartData } from "utils/charts/summary";
import { getSumOfValuesFromTimeRange } from "utils/charts/utils";

import Chart from "chart.js/auto";

import styles from "../styles.module.scss";
import BarChart from "@/Atoms/Charts/BarChart";
import MoneyCards from "@/Molecules/MoneyCards";
import ChartPieCluster from "@/Molecules/ChartPieCluster";

Chart;

function DashboardStatisticsYearly() {
  const { userData } = useData();

  const chartsData = {
    expenses: getExpensesChartData(userData.expenses, "year"),
    income: getIncomeChartData(userData.income, "year"),
    comparison: getYearComparisonData(userData.expenses, userData.income),
    summary: getSummaryChartData(userData.expenses, userData.income, "year"),
  };

  const cardsData = {
    expensesValue: getSumOfValuesFromTimeRange(userData.expenses, "year"),
    incomeValue: getSumOfValuesFromTimeRange(userData.income, "year"),
  };

  return (
    <>
      <div className={styles["charts"]}>
        <MoneyCards cardsData={cardsData} timeRange="year" />
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <BarChart
            title="Comparison Expenses / Income"
            chartData={chartsData.comparison}
          />
        </div>
        <ChartPieCluster chartsData={chartsData} timeRange="year" />
      </div>
    </>
  );
}

export default DashboardStatisticsYearly;
