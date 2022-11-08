import { useData } from "@/context/UserDataContext";

import {
  getExpensesChartData,
  getIncomeChartData,
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

  return (
    <>
      <div className={styles["charts"]}>
        <div className={styles["blocks"]}>
          <div className={styles["block"]}>
            <Card title="All of Expenses value">
              <h3>asd</h3>
            </Card>
          </div>
          <div className={styles["block"]}>
            <Card title="All of Income value">
              <h3>qwe</h3>
            </Card>
          </div>
          <div className={styles["block"]}>
            <Card title="All of Investments value">
              <h3>jlk</h3>
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
            <Card title="Yearly Investments">
              <Pie data={chartsData.yearlyExpenses} options={optionsPie} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsYearly;
