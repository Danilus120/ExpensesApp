import PieChart from "@/Atoms/Charts/PieChart";
import { ChartsDataI } from "types/chart.interface";
import { capitalizeFirstLetter, checkIfChartDataIsNotEmpty } from "utils/utils";

import styles from "./styles.module.scss";

interface ChartPieClusterProps {
  chartsData: ChartsDataI;
  timeRange: "week" | "month" | "year";
}

function ChartPieCluster({ chartsData, timeRange }: ChartPieClusterProps) {
  const timeSpec = capitalizeFirstLetter(timeRange);

  const isEmpty = {
    expenses: checkIfChartDataIsNotEmpty(chartsData.expenses),
    income: checkIfChartDataIsNotEmpty(chartsData.income),
    summary: checkIfChartDataIsNotEmpty(chartsData.summary),
  };

  return (
    <div className={styles["cluster"]}>
      {isEmpty.expenses ? (
        <PieChart
          title={`${timeSpec}ly Expenses`}
          chartData={chartsData.expenses}
        />
      ) : null}
      {isEmpty.income ? (
        <PieChart
          title={`${timeSpec}ly Income`}
          chartData={chartsData.income}
        />
      ) : null}
      {isEmpty.expenses ? (
        <PieChart
          title={`${timeSpec}ly Investments`}
          chartData={chartsData.expenses}
        />
      ) : null}
      {isEmpty.summary ? (
        <PieChart
          title={`${timeSpec}ly Summary`}
          chartData={chartsData.summary}
        />
      ) : null}
    </div>
  );
}

export default ChartPieCluster;
