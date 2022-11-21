import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import MoneyCards from "@/Organisms/DashboardStatistics/components/MoneyCards";
import ChartPieCluster from "@/Organisms/DashboardStatistics/components/ChartPieCluster";
import BarChart from "@/Atoms/Charts/BarChart";
import Card from "@/Atoms/Card";
import { generateOptionsBar } from "@/constants/chartsOptions";
import { useData } from "@/context/UserDataContext";
import { getWeekComparisonData } from "utils/charts/Bar/comparison";
import { getInvestmentsBarChartData } from "utils/charts/Bar/getBarChartData";
import { generateInvestmentsBarChartLegendData } from "utils/charts/Bar/legend";
import styles from "../styles.module.scss";

Chart;

function DashboardStatisticsWeekly() {
  const { userData } = useData();

  const chartsData = {
    comparison: getWeekComparisonData(userData.expenses, userData.income),
    investments: getInvestmentsBarChartData(
      userData.investments.filter((investment) => investment.withdrawn),
      "week"
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
        <MoneyCards timeRange="week" />
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <BarChart
            title="Comparison Expenses / Income"
            chartData={chartsData.comparison}
          />
        </div>
        <ChartPieCluster timeRange="week" />
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <Card title="Investments">
            <div className={styles["topCategory"]}>
              <div className={styles["topCategory__chart"]}>
                <Bar
                  data={chartsData.investments}
                  options={generateOptionsBar(userData.default_Currency, {
                    indexAxis: "y",
                    haveLegend: false,
                  })}
                  height={250}
                />
              </div>
              <div className={styles["topCategory__legend"]}>
                {legends.investments.map((data) => (
                  <div
                    key={data.label}
                    className={styles["topCategory__legend__container"]}
                  >
                    <div
                      className={styles["topCategory__legend__color"]}
                      style={{ backgroundColor: data.color }}
                    ></div>
                    <p>
                      <span>{data.label}:</span> {data.value}{" "}
                      {userData.default_Currency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsWeekly;
