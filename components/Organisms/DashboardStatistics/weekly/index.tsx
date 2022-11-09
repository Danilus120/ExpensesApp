import { useData } from "@/context/UserDataContext";

import {
  getExpensesChartData,
  getIncomeChartData,
  getSumOfValuesFromTimeRange,
  getWeekComparisonData,
} from "utils/chartsUtils";

import Chart from "chart.js/auto";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";
import BarChart from "@/Atoms/Charts/BarChart";
import PieChart from "@/Atoms/Charts/PieChart";

Chart;

function DashboardStatisticsWeekly() {
  const { userData } = useData();

  const chartsData = {
    weeklyExpenses: getExpensesChartData(userData.expenses, "week"),
    weeklyIncome: getIncomeChartData(userData.income, "week"),
    comparison: getWeekComparisonData(userData.expenses, userData.income),
  };

  const cardsData = {
    weeklyExpensesValue: getSumOfValuesFromTimeRange(userData.expenses, "week"),
    weeklyIncomeValue: getSumOfValuesFromTimeRange(userData.income, "week"),
  };

  return (
    <>
      <div className={styles["charts"]}>
        <div className={styles["blocks"]}>
          <div className={`${styles["block"]} ${styles["block--expenses"]}`}>
            <Card title="Weekly Expenses value">
              <h3>
                {cardsData.weeklyExpensesValue || "0"}{" "}
                {userData.default_Currency}
              </h3>
            </Card>
          </div>
          <div className={`${styles["block"]} ${styles["block--income"]}`}>
            <Card title="Weekly Income value">
              <h3>
                {cardsData.weeklyIncomeValue || "0"} {userData.default_Currency}
              </h3>
            </Card>
          </div>
          <div className={`${styles["block"]} ${styles["block--investments"]}`}>
            <Card title="Weekly Investments value">
              <h3>0 {userData.default_Currency}</h3>
            </Card>
          </div>
        </div>
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <BarChart
            title="Comparison Expenses / Income"
            chartData={chartsData.comparison}
          />
        </div>
        <div className={styles["cluster"]}>
          <div className={styles["chart"]}>
            <PieChart
              title="Weekly Expenses"
              chartData={chartsData.weeklyExpenses}
            />
          </div>
          <div className={styles["chart"]}>
            <PieChart
              title="Weekly Income"
              chartData={chartsData.weeklyIncome}
            />
          </div>
          <div className={styles["chart"]}>
            <PieChart
              title="Weekly Investments"
              chartData={chartsData.weeklyExpenses}
            />
          </div>
          <div className={styles["chart"]}>
            <PieChart title="Summary" chartData={chartsData.weeklyExpenses} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsWeekly;
