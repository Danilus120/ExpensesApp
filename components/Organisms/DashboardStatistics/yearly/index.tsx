import { useData } from "@/context/UserDataContext";

import {
  getExpensesChartData,
  getIncomeChartData,
  getSumOfValuesFromTimeRange,
  getYearComparisonData,
} from "utils/chartsUtils";

import Chart from "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";
import { optionsBar, optionsPie } from "@/constants/chartsOptions";

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
          <div className={styles["block"]}>
            <Card title="Yearly Expenses value">
              <h3>
                {cardsData.yearlyExpensesValue || "0"}{" "}
                {userData.default_Currency}
              </h3>
            </Card>
          </div>
          <div className={styles["block"]}>
            <Card title="Yearly Income value">
              <h3>
                {cardsData.yearlyIncomeValue || "0"} {userData.default_Currency}
              </h3>
            </Card>
          </div>
          <div className={styles["block"]}>
            <Card title="Yearly Investments value">
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
            <Card title="Yearly expenses">
              <Pie data={chartsData.yearlyExpenses} options={optionsPie} />
            </Card>
          </div>
          <div className={styles["chart"]}>
            <Card title="Yearly Income">
              <Pie data={chartsData.yearlyIncome} options={optionsPie} />
            </Card>
          </div>
          <div className={styles["chart"]}>
            <Card title="Yearly Investments">
              <Pie data={chartsData.yearlyExpenses} options={optionsPie} />
            </Card>
          </div>
          <div className={styles["chart"]}>
            <Card title="Summary">
              <Pie data={chartsData.yearlyExpenses} options={optionsPie} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsYearly;
