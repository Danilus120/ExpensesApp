import { useData } from "@/context/UserDataContext";

import {
  getExpensesChartData,
  getIncomeChartData,
  getMonthComparisonData,
  getSumOfValuesFromTimeRange,
} from "utils/chartsUtils";

import Chart from "chart.js/auto";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";
import BarChart from "@/Atoms/Charts/BarChart";
import PieChart from "@/Atoms/Charts/PieChart";

Chart;

function DashboardStatisticsMonthly() {
  const { userData } = useData();

  const chartsData = {
    monthlyExpenses: getExpensesChartData(userData.expenses, "month"),
    monthlyIncome: getIncomeChartData(userData.income, "month"),
    comparison: getMonthComparisonData(userData.expenses, userData.income),
  };

  const cardsData = {
    monthlyExpensesValue: getSumOfValuesFromTimeRange(
      userData.expenses,
      "month"
    ),
    monthlyIncomeValue: getSumOfValuesFromTimeRange(userData.income, "month"),
  };

  return (
    <>
      <div className={styles["charts"]}>
        <div className={styles["blocks"]}>
          <div className={`${styles["block"]} ${styles["block--expenses"]}`}>
            <Card title="Monthly Expenses value">
              <h3>
                {cardsData.monthlyExpensesValue || "0"}{" "}
                {userData.default_Currency}
              </h3>
            </Card>
          </div>
          <div className={`${styles["block"]} ${styles["block--income"]}`}>
            <Card title="Monthly Income value">
              <h3>
                {cardsData.monthlyIncomeValue || "0"}{" "}
                {userData.default_Currency}
              </h3>
            </Card>
          </div>
          <div className={`${styles["block"]} ${styles["block--investments"]}`}>
            <Card title="Monthly Investments value">
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
              title="Monthly Expenses"
              chartData={chartsData.monthlyExpenses}
            />
          </div>
          <div className={styles["chart"]}>
            <PieChart
              title="Monthly Income"
              chartData={chartsData.monthlyIncome}
            />
          </div>
          <div className={styles["chart"]}>
            <PieChart
              title="Monthly Investments"
              chartData={chartsData.monthlyExpenses}
            />
          </div>
          <div className={styles["chart"]}>
            <PieChart title="Summary" chartData={chartsData.monthlyExpenses} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsMonthly;
