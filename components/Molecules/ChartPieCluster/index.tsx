import PieChart from "@/Atoms/Charts/PieChart";
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
      <div className={styles["chart"]}>
        <PieChart
          title={`${timeSpec}ly Expenses`}
          chartData={chartsData.expenses}
        />
      </div>
      <div className={styles["chart"]}>
        <PieChart
          title={`${timeSpec}ly Income`}
          chartData={chartsData.income}
        />
      </div>
      <div className={styles["chart"]}>
        <PieChart
          title={`${timeSpec}ly Investments`}
          chartData={chartsData.expenses}
        />
      </div>
      <div className={styles["chart"]}>
        <PieChart title={`${timeSpec}ary`} chartData={chartsData.expenses} />
      </div>
    </div>
  );
}

export default ChartPieCluster;
