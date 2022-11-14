import { useData } from "@/context/UserDataContext";

import { getMonthComparisonData } from "utils/charts/Bar/comparison";

import Chart from "chart.js/auto";

import styles from "../styles.module.scss";
import BarChart from "@/Atoms/Charts/BarChart";
import MoneyCards from "@/Organisms/DashboardStatistics/components/MoneyCards";
import ChartPieCluster from "@/Organisms/DashboardStatistics/components/ChartPieCluster";

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
