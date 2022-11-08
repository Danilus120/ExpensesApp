import { useData } from "@/context/UserDataContext";

import {
  getExpensesChartData,
  getIncomeChartData,
  getMonthComparisonData,
  getSumOfValuesFromTimeRange,
} from "utils/chartsUtils";

import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";
import { optionsBar, optionsPie } from "@/constants/chartsOptions";

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
          <Card title="Comparison Expenses / Income">
            <Bar data={chartsData.comparison} options={optionsBar} />
          </Card>
        </div>
        <div className={styles["cluster"]}>
          <div className={styles["chart"]}>
            <Card title="Monthly expenses">
              <Pie data={chartsData.monthlyExpenses} options={optionsPie} />
            </Card>
          </div>
          <div className={styles["chart"]}>
            <Card title="Monthly Income">
              <Pie data={chartsData.monthlyIncome} options={optionsPie} />
            </Card>
          </div>
          <div className={styles["chart"]}>
            <Card title="Monthly Investments">
              <Pie data={chartsData.monthlyExpenses} options={optionsPie} />
            </Card>
          </div>
          <div className={styles["chart"]}>
            <Card title="Summary">
              <Pie data={chartsData.monthlyExpenses} options={optionsPie} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsMonthly;
