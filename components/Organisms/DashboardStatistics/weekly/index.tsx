import { useData } from "@/context/UserDataContext";

import {
  getDataFromTimeRange,
  getExpensesChartData,
  getIncomeChartData,
  getSumOfValuesFromTimeRange,
  getWeekComparisonData,
} from "utils/chartsUtils";

import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";
import { optionsBar, optionsPie } from "@/constants/chartsOptions";

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
          {/* TODO: MoneyCards timeRange="week" */}
          <div className={`${styles["block"]} ${styles["block--expenses"]}`}>
            <Card title="Weekly Expenses value">
              <h3>
                {cardsData.weeklyExpensesValue || "0"}{" "}
                {userData.default_Currency}
              </h3>
            </Card>
          </div>
          <div className={`${styles["block"]} ${styles["block--income"]}`}>
            <Card title="All of Income value">
              <h3>
                {cardsData.weeklyIncomeValue || "0"} {userData.default_Currency}
              </h3>
            </Card>
          </div>
          <div className={`${styles["block"]} ${styles["block--investments"]}`}>
            <Card title="All of Investments value">
              <h3>0 {userData.default_Currency}</h3>
            </Card>
          </div>
        </div>
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <Card title="Comparison Expenses / Income">
            <Bar data={chartsData.comparison} options={optionsBar} />
          </Card>
        </div>
        {/* TODO: Other component - generic */}
        <div className={styles["cluster"]}>
          <div className={styles["chart"]}>
            <Card title="Weekly expenses">
              <Pie data={chartsData.weeklyExpenses} options={optionsPie} />
            </Card>
          </div>
          <div className={styles["chart"]}>
            <Card title="Weekly Income">
              <Pie data={chartsData.weeklyIncome} options={optionsPie} />
            </Card>
          </div>
          <div className={styles["chart"]}>
            <Card title="Weekly Investments">
              <Pie data={chartsData.weeklyExpenses} options={optionsPie} />
            </Card>
          </div>
          <div className={styles["chart"]}>
            <Card title="Summary">
              <Pie data={chartsData.weeklyExpenses} options={optionsPie} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsWeekly;
