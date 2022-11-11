import { useData } from "@/context/UserDataContext";

import { getWeekComparisonData } from "utils/charts/comparison";

import Chart from "chart.js/auto";

import styles from "../styles.module.scss";
import BarChart from "@/Atoms/Charts/BarChart";
import MoneyCards from "@/Molecules/MoneyCards";
import ChartPieCluster from "@/Molecules/ChartPieCluster";

Chart;

function DashboardStatisticsWeekly() {
  const { userData } = useData();

  const chartsData = {
    comparison: getWeekComparisonData(userData.expenses, userData.income),
  };

  return (
    <>
      <div className={styles["charts"]}>
        <MoneyCards timeRange="week" />
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <BarChart
            title="Comparison Expenses / Income"
            chartData={chartsData.comparison}
          />
        </div>
        <ChartPieCluster timeRange="week" />
      </div>
    </>
  );
}

export default DashboardStatisticsWeekly;
