import { useData } from "@/context/UserDataContext";

import {
  getExpensesChartData,
  getIncomeChartData,
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

  return (
    <>
      <div className={styles["charts"]}>
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <Card title="Comparison Expenses / Income">
            <Bar data={chartsData.comparison} options={optionsBar} />
          </Card>
        </div>
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
      </div>
    </>
  );
}

export default DashboardStatisticsWeekly;
