import { useData } from "@/context/UserDataContext";

import { getMonthComparisonData } from "utils/charts/comparison";

import Chart from "chart.js/auto";

import styles from "../styles.module.scss";
import BarChart from "@/Atoms/Charts/BarChart";
import MoneyCards from "@/Molecules/MoneyCards";
import ChartPieCluster from "@/Molecules/ChartPieCluster";

Chart;

function DashboardStatisticsMonthly() {
  const { userData } = useData();

  const chartsData = {
    comparison: getMonthComparisonData(userData.expenses, userData.income),
  };

  return (
    <>
      <div className={styles["charts"]}>
        <MoneyCards timeRange="month" />
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <BarChart
            title="Comparison Expenses / Income"
            chartData={chartsData.comparison}
          />
        </div>
        <ChartPieCluster timeRange="month" />
      </div>
    </>
  );
}

export default DashboardStatisticsMonthly;
