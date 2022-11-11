import { useData } from "@/context/UserDataContext";

import { getYearComparisonData } from "utils/charts/comparison";

import Chart from "chart.js/auto";

import styles from "../styles.module.scss";
import BarChart from "@/Atoms/Charts/BarChart";
import MoneyCards from "@/Molecules/MoneyCards";
import ChartPieCluster from "@/Molecules/ChartPieCluster";

Chart;

function DashboardStatisticsYearly() {
  const { userData } = useData();

  const chartsData = {
    comparison: getYearComparisonData(userData.expenses, userData.income),
  };

  return (
    <>
      <div className={styles["charts"]}>
        <MoneyCards timeRange="year" />
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <BarChart
            title="Comparison Expenses / Income"
            chartData={chartsData.comparison}
          />
        </div>
        <ChartPieCluster timeRange="year" />
      </div>
    </>
  );
}

export default DashboardStatisticsYearly;
