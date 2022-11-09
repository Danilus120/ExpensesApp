import { useData } from "@/context/UserDataContext";

import {
  getExpensesChartData,
  getIncomeChartData,
  getSumOfValuesFromTimeRange,
  getYearComparisonData,
} from "utils/chartsUtils";

import Chart from "chart.js/auto";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";
import PieChart from "@/Atoms/Charts/PieChart";
import BarChart from "@/Atoms/Charts/BarChart";

Chart;

function DashboardStatisticsYearly() {
  const { userData } = useData();

  const chartsData = {
    yearlyExpenses: getExpensesChartData(userData.expenses, "year"),
    yearlyIncome: getIncomeChartData(userData.income, "year"),
    comparison: getYearComparisonData(userData.expenses, userData.income),
  };

  const cardsData = {
    yearlyExpensesValue: getSumOfValuesFromTimeRange(userData.expenses, "year"),
    yearlyIncomeValue: getSumOfValuesFromTimeRange(userData.income, "year"),
  };

  return (
    <>
      <div className={styles["charts"]}>
        <div className={styles["blocks"]}>
          <div className={`${styles["block"]} ${styles["block--expenses"]}`}>
            <Card title="Yearly Expenses value">
              <h3>
                {cardsData.yearlyExpensesValue || "0"}{" "}
                {userData.default_Currency}
              </h3>
            </Card>
          </div>
          <div className={`${styles["block"]} ${styles["block--income"]}`}>
            <Card title="Yearly Income value">
              <h3>
                {cardsData.yearlyIncomeValue || "0"} {userData.default_Currency}
              </h3>
            </Card>
          </div>
          <div className={`${styles["block"]} ${styles["block--investments"]}`}>
            <Card title="Yearly Investments value">
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
              title="Yearly Expenses"
              chartData={chartsData.yearlyExpenses}
            />
          </div>
          <div className={styles["chart"]}>
            <PieChart
              title="Yearly Income"
              chartData={chartsData.yearlyIncome}
            />
          </div>
          <div className={styles["chart"]}>
            <PieChart
              title="Yearly Investments"
              chartData={chartsData.yearlyExpenses}
            />
          </div>
          <div className={styles["chart"]}>
            <PieChart title="Summary" chartData={chartsData.yearlyExpenses} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsYearly;
