import Card from "@/Atoms/Card";
import PieChart from "@/Atoms/Charts/PieChart";
import { useData } from "@/context/UserDataContext";
import { generatePieChartLegendData } from "utils/chartLegendUtil";
import { capitalizeFirstLetter } from "utils/utils";

import styles from "./styles.module.scss";

interface ChartPieClusterProps {
  chartsData: {
    expenses: any;
    income: any;
    comparison: any;
  };
  timeRange: "week" | "month" | "year";
}

function ChartPieCluster({ chartsData, timeRange }: ChartPieClusterProps) {
  const timeSpec = capitalizeFirstLetter(timeRange);

  return (
    <div className={styles["cluster"]}>
      <PieChart
        title={`${timeSpec}ly Expenses`}
        chartData={chartsData.expenses}
      />
      <PieChart title={`${timeSpec}ly Income`} chartData={chartsData.income} />
      <PieChart
        title={`${timeSpec}ly Investments`}
        chartData={chartsData.expenses}
      />
      <PieChart title={`${timeSpec}ary`} chartData={chartsData.expenses} />
    </div>
  );
}

export default ChartPieCluster;
