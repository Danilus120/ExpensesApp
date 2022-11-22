import Chart from "chart.js/auto";
import MoneyCards from "@/Organisms/DashboardStatistics/components/MoneyCards";
import ChartPieCluster from "@/Organisms/DashboardStatistics/components/ChartPieCluster";
import BarChart from "@/Atoms/Charts/BarChart";
import { useData } from "@/context/UserDataContext";
import { getYearComparisonData } from "utils/charts/Bar/comparison";
import { getInvestmentsBarChartData } from "utils/charts/Bar/getBarChartData";
import { generateInvestmentsBarChartLegendData } from "utils/charts/Bar/legend";
import styles from "../styles.module.scss";
import BarChartWithLegend from "@/Atoms/Charts/BarChartWithLegend";

Chart;

function DashboardStatisticsYearly() {
  const { userData } = useData();

  const chartsData = {
    comparison: getYearComparisonData(userData.expenses, userData.income),
    investments: getInvestmentsBarChartData(
      userData.investments.filter((investment) => investment.withdrawn),
      "year"
    ),
  };

  const legends = {
    investments: generateInvestmentsBarChartLegendData(chartsData.investments, {
      sort: "dsc",
    }),
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
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <BarChartWithLegend
            chartData={chartsData.investments}
            legend={legends.investments}
            timeRange="year"
            inPercents={false}
          />
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsYearly;
